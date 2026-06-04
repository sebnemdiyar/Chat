import EmojiPicker from "emoji-picker-react";
import { useRef, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Form = ({ user, room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleEmojiClick = (e) => {
    // eğer referenası alabildiyse
    if (inputRef.current) {
      // inputta imleçle yapılan seçimimin başladığı konum
      const start = inputRef.current.selectionStart;

      // inputta imleçle yapılan seçimimin bittiği konum
      const end = inputRef.current.selectionEnd;

      // seçili konuma emoji ekle
      setText(
        (prev) => prev.substring(0, start) + e.emoji + prev.substring(end),
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return; // text yoksa trimlediktan sonra fonksiyonu durdur

    // verinin kayedileceği kolleksiyonun referansını al
    const collectionRef = collection(db, "messages");

    // temizle (hem inputtaki mesajı siliyor hem emoji popup'ını kapatıyor)
    setText("");
    setIsOpen(false);

    // mesaj belgesini kolleksiyona kaydet
    await addDoc(collectionRef, {
      text: text.trim(),
      room,
      author: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 border border-gray-200 shadow-lg flex justify-center gap-3"
    >
      <input
        ref={inputRef}
        value={text}
        type="text"
        placeholder="mesaj giriniz..."
        className="border border-gray-200 shadow-sm p-2 px-3 rounded-md w-1/2"
        onChange={(e) => setText(e.target.value)}
      />

      <div className="relative">
        <div className="absolute top-[-470px] right-[-140px]">
          <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="btn text-base"
        >
          😂
        </button>
      </div>

      <button
        type="submit"
        className="btn bg-black text-white disabled:brightness-75"
      >
        Gönder
      </button>
    </form>
  );
};

export default Form;

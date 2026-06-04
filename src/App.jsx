import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./pages/room";
import Login from "./pages/login";
import Chat from "./pages/chat";
import Protected from "./components/protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Oturumu kapalı kullanıcılar giremeyecek, girmesini istemediğimiz routelerı bir kapsayıcı route içine alırız. HOC ile de yapılabilir ama o zaman her bir sayfayı ayrı ayrı kapsamak gerekir. Kapsayıcı Route en efektif çözüm. */}
        <Route element={<Protected />}>
          <Route path="/" element={<Room />} />
          <Route path="/chat/:room" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

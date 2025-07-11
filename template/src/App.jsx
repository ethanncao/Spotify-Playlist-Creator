import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Playlist from "./Playlist.jsx";
import Login from "./Login.jsx";
import Callback from "./Callback.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

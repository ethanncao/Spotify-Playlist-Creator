import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Playlist from "./Playlist.jsx";
import Login from "./Login.jsx";
import Callback from "./Callback.jsx";
import PromptInput from "./PromptInput.jsx";

function App() {
  const handleTags = (response) => {
    console.log("OpenAI response:", response);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route
            path="/promptinput"
            element={<PromptInput onTagsGenerated={handleTags} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

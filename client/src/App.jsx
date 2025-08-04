import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Playlist from "./Playlist.jsx";
import Login from "./Login.jsx";
import Callback from "./Callback.jsx";
import PromptInput from "./PromptInput.jsx";

function App() {
  const handleTags = async (response) => {
    const genres = response.split(" ");
    console.log("OpenAI response:", response);
    console.log(genres);
    const accessToken = localStorage.getItem("spotify_token");
    const res = await fetch("http://localhost:5000/spotify/recc-tracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genres,
        accessToken,
      }),
    });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route
            path="/prompt"
            element={<PromptInput onTagsGenerated={handleTags} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

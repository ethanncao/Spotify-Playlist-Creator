import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Playlist from "./Playlist.jsx";
import Login from "./Login.jsx";
import Callback from "./Callback.jsx";
import PromptInput from "./PromptInput.jsx";

function App() {
  const handleTags = async (response) => {
    const songs = JSON.parse(response);
    const accessToken = localStorage.getItem("spotify_token");
    console.log("OpenAI response:", songs);

    try {
      const res = await fetch("http://localhost:5000/spotify/recc-tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracks: songs, accessToken }),
      });

      if (!res.ok) {
        console.error("Server error:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Tracks from spotify:", data.results[0]);
    } catch (err) {
      console.error("Fetch failed", err);
    }
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

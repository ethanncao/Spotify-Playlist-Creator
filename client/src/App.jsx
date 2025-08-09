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

    const res = await fetch("http://localhost:5000/spotify/build-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken,
        tracks: songs,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Create playlist failed:", data);
      alert("Failed to create playlist.");
      return;
    }

    console.log("Playlist created:", data);
    if (data.url) window.open(data.url, "_blank");
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

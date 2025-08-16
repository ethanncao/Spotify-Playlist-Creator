/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { API_BASE } from "./config";

function Playlist() {
  const [tracks, setTracks] = useState([]);
  // we have to get the access token from Callback and then use it to call our top-tracks route

  useEffect(() => {
    const fetchTopTracks = async () => {
      const token = localStorage.getItem("spotify_token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/spotify/top-tracks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        setTracks(data.tracks.items || []);
      } catch (err) {
        console.error("Failed to fetch top tracks:", err);
      }
    };

    fetchTopTracks();
  }, []);

  console.log("hello?");
  console.log(tracks);

  return (
    <div>
      <h2>Your Top Tracks</h2>
      <ol>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} by {track.artists.map((a) => a.name).join(", ")}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Playlist;

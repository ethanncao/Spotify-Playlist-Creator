import { useEffect, useState } from "react";
import axios from "axios";

const clientId = "b470ddb998e941ea8cca13ae01930a27"; // Replace this
const redirectUri = "http://127.0.0.1:5173/callback";

function Callback() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getAccessToken = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", redirectUri);
      params.append("code_verifier", verifier);

      try {
        const { data } = await axios.post(
          "https://accounts.spotify.com/api/token",
          params,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const accessToken = data.access_token;

        // Fetch top 3 tracks
        const topArtists = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?limit=3",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setArtists(topArtists.data.items);
      } catch (err) {
        console.error("Failed to get top tracks:", err);
      }
    };

    getAccessToken();
  }, []);

  console.log(artists);
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Top 3 Spotify Artists 🎵</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <strong>{artist.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Callback;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./config";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        console.error("No code found in URL");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/callback?code=${code}`);
        const data = await res.json();

        if (data.token?.access_token) {
          console.log("✅ Access Token:", data.token.access_token);
          localStorage.setItem("spotify_token", data.token.access_token);

          // TODO: Save token somewhere (e.g. localStorage or context)
          // localStorage.setItem("spotify_token", data.token.access_token);

          // Navigate to the next screen
          navigate("/prompt");
        }
      } catch (err) {
        console.error("❌ Error fetching token:", err);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Authorizing with Spotify...</div>;
}

export default Callback;

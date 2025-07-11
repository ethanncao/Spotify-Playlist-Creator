import { generateCodeChallenge, generateCodeVerifier } from "./utils/pkce";
import "./styles/Login.css";

const clientId = "b470ddb998e941ea8cca13ae01930a27";
const redirectUri = "http://127.0.0.1:5173/callback";
const scope = "user-top-read";

function Login() {
  const handleLogin = async () => {
    const verifier = generateCodeVerifier();
    localStorage.setItem("verifier", verifier);

    const challenge = await generateCodeChallenge(verifier);

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${challenge}`;

    window.location = authUrl;
  };

  return (
    <div>
      <h1>Welcome to Spotify Playlist Creator!</h1>
      <div>
        Discover music like never before. Our website lets you turn a simple
        prompt—like “chill beats for homework” or “a playlist for road trips
        under the stars”—into a personalized Spotify playlist. Powered by OpenAI
        and Spotify’s vast music library, it understands your mood, suggests
        matching genres or artists, and curates a hand-picked list of tracks
        just for you. Whether you're studying, celebrating, or just vibing, this
        is your new go-to tool for effortlessly creating the perfect soundtrack
        for any moment.
      </div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default Login;

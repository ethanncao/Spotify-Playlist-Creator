import { generateCodeChallenge, generateCodeVerifier } from "./utils/pkce";

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
      <h1>See Top Spotify Songs</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default Login;

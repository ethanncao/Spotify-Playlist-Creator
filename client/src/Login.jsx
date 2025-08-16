import "./styles/Login.css";
import { API_BASE } from "./config";

function Login() {
  const handleLogin = async () => {
    console.log("API_BASE in prod =", API_BASE);
    const res = await fetch(`${API_BASE}/auth/login`);
    const data = await res.json();
    window.location.href = data.authUrl;
  };

  return (
    <div className="page">
      <header className="navbar">
        <div className="brand">
          <img src="/tune-pilot-logo.png" alt="" className="brand-mark" />
          <span className="brand-name">Tune Pilot</span>
        </div>

        <button type="button" className="login-btn" onClick={handleLogin}>
          <span className="logo-badge">
            <img src="/spotify-logo.png" alt="Spotify" />
          </span>
          <span>Sign in with Spotify</span>
        </button>
      </header>

      <div className="container">
        <h1 className="header">Welcome to Tune Pilot!</h1>
        <div className="desc">
          Discover music like never before. This website lets you turn a simple
          prompt like “chill beats for homework” or “a playlist for road trips
          under the stars” into a personalized Spotify playlist. Powered by
          OpenAI and Spotify’s vast music library, it understands your mood,
          suggests matching genres or artists, and curates a hand-picked list of
          tracks just for you. Whether you're studying, celebrating, or just
          vibing, this is your new go-to tool for effortlessly creating the
          perfect soundtrack for any moment.
        </div>

        <div className="steps-container">
          <h2>How it works</h2>
          <ul>
            <li>
              <span className="li-head">1) Log in with Spotify</span>
              <div className="li-desc">
                Connect your account so we can search tracks and save playlists
                to your library. Don't worry, we will never post or follow
                anything on your behalf.
              </div>
            </li>
            <li>
              <span className="li-head">2) Describe the vibe</span>
              <div className="li-desc">
                Type a prompt like "late-night study beats". Add artists/genres
                if you want.
              </div>
            </li>
            <li>
              <span className="li-head">3) Get your playlist</span>
              <div className="li-desc">
                You now have a link to your playlist that you can open on
                Spotify and save to your library.
              </div>
            </li>
          </ul>
        </div>

        <div className="btn-container">
          <div>Please login with spotify to start creating your playlist!</div>
          <button onClick={handleLogin} className="login-btn">
            <span className="logo-badge">
              <img src="/spotify-logo.png" alt="Spotify" />
            </span>
            <span>Sign in with Spotify</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

import "./styles/Login.css";

function Login() {
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login");
    const data = await res.json();
    window.location.href = data.authUrl;
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

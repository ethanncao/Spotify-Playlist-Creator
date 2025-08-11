import "./styles/Login.css";

function Login() {
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login");
    const data = await res.json();
    window.location.href = data.authUrl;
  };

  return (
    <div className="container">
      <h1 className="header">Welcome to Tune Pilot!</h1>
      <div className="desc">
        Discover music like never before. This website lets you turn a simple
        prompt like “chill beats for homework” or “a playlist for road trips
        under the stars” into a personalized Spotify playlist. Powered by OpenAI
        and Spotify’s vast music library, it understands your mood, suggests
        matching genres or artists, and curates a hand-picked list of tracks
        just for you. Whether you're studying, celebrating, or just vibing, this
        is your new go-to tool for effortlessly creating the perfect soundtrack
        for any moment.
      </div>
      <div>
        {/* Here we will put stuff for each step on how to create your playlist */}
      </div>
      <div className="btn-container">
        <div>Please login with spotify to start creating your playlist!</div>
        <button onClick={handleLogin}>
          <img src="/spotify-logo.png" alt="" className="spotify-logo" />
          Login with Spotify
        </button>
      </div>
      <div className="footer">Ethan Cao 2025 - Tune Pilot</div>
    </div>
  );
}

export default Login;

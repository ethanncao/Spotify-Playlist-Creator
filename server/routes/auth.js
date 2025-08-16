// create a route for our frontend to access
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_API_KEY;
const REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI || process.env.SPOTIFY_REDIRECT;

// create a route at /auth/login that constructs the correct Spotify authorization URL with all required query parameters and sends it back in a JSON response to the frontend
router.get("/login", (req, res) => {
  // this creates a GET route
  // whatever code in here will run whenever your frontend calls fetch
  // construct the Spotify authorization URL
  /* 
    we need:
    client_id
    redirect_uri
    response_type
    scope
  */

  const params = new URLSearchParams(); // URLSearchParams creates query strings

  params.append("client_id", process.env.SPOTIFY_API_KEY);
  params.append("response_type", "code");
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT);
  params.append(
    "scope",
    "user-top-read playlist-modify-private playlist-modify-public"
  );
  params.append("show_dialog", "true");

  console.log("[/auth/login]", {
    client_id_prefix: CLIENT_ID ? CLIENT_ID.slice(0, 6) + "…" : "MISSING",
    redirect_uri: REDIRECT_URI,
  });

  const authURL = `https://accounts.spotify.com/authorize?${params.toString()}`;
  res.json({ authUrl: authURL });
});

router.get("/callback", async (req, res) => {
  // once the user authorizes we need to use the code to get an access token
  const code = req.query.code;
  console.log("Authorization code received:", req.query.code);

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("client_id", process.env.SPOTIFY_API_KEY);
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT);
  params.append("client_secret", process.env.SPOTIFY_SECRET);

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    const tokenData = await tokenResponse.json();

    res.json({ success: true, token: tokenData });
  } catch (err) {
    console.error("Error getting Spotify token:", err);
    res.status(500).json({ error: "Failed to get token" });
  }
});

module.exports = router;

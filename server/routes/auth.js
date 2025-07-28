// create a route for our frontend to access
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

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
  params.append("scope", "user-top-read");

  const authURL = `https://accounts.spotify.com/authorize?${params.toString()}`;
  res.json({ authUrl: authURL });
});

router.get("/callback", (req, res) => {
  // once the user authorizes we need to use the code to get an access token
});

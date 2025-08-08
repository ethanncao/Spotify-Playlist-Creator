const express = require("express");

const router = express.Router();

router.post("/top-tracks", async (req, res) => {
  const accessToken = req.body.token;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    res.json({ tracks: data });
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

// RECCOMENDED PLAYLIST
router.post("/recc-tracks", async (req, res) => {
  console.log("recc/tracks request hit");
  const tracks = req.body.tracks;
  const accessToken = req.body.accessToken;

  if (!accessToken) {
    return res.status(400).json({ error: "Missing or invalid data" });
  }

  const results = [];

  for (const song of tracks) {
    // getting the url for the song
    const query = encodeURIComponent(`${song.track} ${song.artist}`);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;

    //try to fetch the song from spotify web api
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (data.tracks?.items?.length > 0) {
        results.push(data.tracks.items[0]);
      }
    } catch (err) {
      console.error("Error searching track:", song, err);
    }
  }

  res.json({ results });
});

module.exports = router;

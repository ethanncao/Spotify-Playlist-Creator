const express = require("express");

const router = express.Router();

router.get("/top-tracks", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

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

module.exports = router;

import { useState } from "react";
import "./styles/PromptInput.css";

function PromptInput({ onTagsGenerated }) {
  const [prompt, setPrompt] = useState(""); // stores the text that the user inputs
  const [loading, setLoading] = useState(false); // tracks whether we are waiting for the API to respond or not

  // This runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page from reloading
    setLoading(true); // true means that we are generating something

    try {
      // make a POST request to backend
      const res = await fetch("http://localhost:5000/api/generate-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }), // ← uses the inputted prompt
      });

      // parses the result we get from our server as JSON
      const data = await res.json();
      onTagsGenerated(data.response); // Pass result back to App
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }

    setLoading(false); // once its all over and we got our response we turn this back to false
  };

  return (
    <div className="page">
      <div className="prompt">
        <div className="header">What's the mood for the playlist today?</div>

        <form onSubmit={handleSubmit}>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your playlist..."
          />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Playlist"}
          </button>
        </form>
      </div>

      <div className="tips">
        <div>Pro Tips</div>
        <ul>
          <li>
            Try adding details: energy level, decade, languages (e.g., "chill
            lofi with piano, 2010s, instrumental)
          </li>
          <li>Use negatives to exclude: "no remixes, no live versions"</li>
          <li>
            Name a few prefered artists to steer the direction of the playlist
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PromptInput;

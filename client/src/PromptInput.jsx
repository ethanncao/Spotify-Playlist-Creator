import { useState } from "react";

function PromptInput({ onTagsGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/generate-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }), // ← uses the inputted prompt
      });

      const data = await res.json();
      onTagsGenerated(data.response); // Pass result back to App
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your playlist vibe..."
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Tags"}
      </button>
    </form>
  );
}

export default PromptInput;

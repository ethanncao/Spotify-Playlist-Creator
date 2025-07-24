import { useState } from "react";

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

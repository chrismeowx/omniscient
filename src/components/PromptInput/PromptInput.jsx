import React, { useState } from 'react';
import arrowUp from '../../assets/images/arrowUp.png';
import './PromptInput.scss';

export default function PromptInput({ setExplanation, setRenderUrl }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (prompt.trim() === "") return;
    setLoading(true);
    
    try {
      const explainResponse = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!explainResponse.ok) {
        const text = await explainResponse.text();
        throw new Error("Explain API Error: " + text);
      }

      const explainData = await explainResponse.json();
      console.log("Explain:", explainData);

      const generateResponse = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!generateResponse.ok) {
        const text = await generateResponse.text();
        throw new Error("Generate API Error: " + text);
      }

      const generateData = await generateResponse.json();
      console.log("Generate:", generateData);

      setExplanation(explainData.result); 
      console.log("Final Render URL:", generateData.render_url);
      setRenderUrl(generateData.render_url);

      setPrompt("");
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="promptHolder">
      <div className="header">
        <h1>Omniscient</h1>
        <p>This website helps users grasp concepts more easily through interactive visualizations.</p>
        <p>Learn complex ideas in a clear and engaging way, visualize and understand.</p>
        <br />
      </div>

      <div className="prompt-wrapper">
        <button onClick={handleSubmit} className="enter-button" disabled={loading}>
          <img src={arrowUp} className="arrow" alt="Submit" />
        </button>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="promptInput"
          placeholder="Please explain proton, neutron, and electron role in building a nucleus"
        ></textarea>
      </div>
    </div>
  );
}

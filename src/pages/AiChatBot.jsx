import React, { useState } from 'react';
import axios from 'axios';
import '../css/aichatbot.css';

const AiChatBot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
  if (!input.trim()) return;

  setLoading(true);

  try {
    const res = await axios.post(
      "https://job-application-backend-ea8w.onrender.com/api/gemini",
      {
        question: input
      }
    );

    setResponse(res.data);
  } catch (error) {
    console.error("Gemini API error:", error);
    setResponse("Sorry, something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="wolfram-chat-container">
      <h2>Ask the Bot!</h2>
      <input
        type="text"
        placeholder="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>
      <div className="response">{response}</div>
    </div>
  );
};

export default AiChatBot;

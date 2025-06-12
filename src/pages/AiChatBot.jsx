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
      const res = await axios.get(`http://localhost:8080/api/wolfram?question=${encodeURIComponent(input)}`);
      setResponse(res.data);
    } catch (error) {
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

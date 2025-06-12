import React, { useState } from 'react';
import ChatBox from './ChatBox';
import '../css/chatbutton.css';

const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div className="chat-button-wrapper">
        <button className="chat-button" onClick={() => setShowChat(!showChat)} title="Chat">
          💬
        </button>
      </div>
      {showChat && <ChatBox />}
    </>
  );
};

export default ChatButton;

import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../css/chatbox.css';
import { useAuth } from '../pages/AuthContext';

const ChatBox = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const stompClientRef = useRef(null);

  const username = user?.username || 'User';

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-chat');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe('/topic/public', (message) => {
          const msg = JSON.parse(message.body);
          setMessages(prev => [...prev, msg]);
        });
      },
      debug: (str) => console.log(str),
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const messageContent = input.trim();
    if (messageContent && stompClientRef.current?.connected) {
      const message = {
        sender: username,
        content: messageContent,
        timestamp: new Date().toISOString()
      };
      stompClientRef.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message)
      });
      setInput('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">Chat among Job-Seekers</div>
      <div className="chat-box-messages" ref={chatRef}>
        {messages.map((msg, index) => (
          <div key={index}><strong>{msg.sender}</strong>: {msg.content}</div>
        ))}
      </div>
      <div className="chat-box-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="chat-box-input"
        />
        <button onClick={sendMessage} className="chat-box-send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

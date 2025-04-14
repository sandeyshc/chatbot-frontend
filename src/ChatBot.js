import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post('https://chatbot-backend-alltius.netlify.app/ask', {
          query: input
        });
        // console.log(response)
        const botMessage = { sender: 'bot', text: response.data.response };
        setMessages([...messages, userMessage, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Add this line to handle Enter key
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
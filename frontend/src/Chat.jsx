import React, { useState, useEffect, useRef } from 'react';
import './index.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/messages`)
        .then(res => res.json())
        .then(setMessages);

    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    ws.onmessage = e => {
      const msg = JSON.parse(e.data);
      setMessages(prev => [...prev, msg]);
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!author || !content) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content })
    });
    const newMsg = await res.json();
    setMessages([...messages, newMsg]);
    setContent('');
  };

  return (
      <div className="chat-container">
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
                <div key={idx} className="chat-message">
                  <span className="chat-author">{msg.author}</span>
                  <p className="chat-content">{msg.content}</p>
                </div>
            ))}
            <div ref={scrollRef}></div>
          </div>

          <div className="chat-input">
            <input
                placeholder="Auteur"
                className="input-author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
            />
            <input
                placeholder="Message"
                className="input-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>Envoyer</button>
          </div>
        </div>
      </div>
  );
}

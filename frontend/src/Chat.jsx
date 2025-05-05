import React, { useState, useEffect } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/messages`)
      .then(res => res.json())
      .then(setMessages);

    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    ws.onmessage = e => {
      const msg = JSON.parse(e.data);
      console.log('WebSocket:', msg);
    };

    return () => ws.close();
  }, []);

  const sendMessage = async () => {
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
    <div>
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input placeholder="Message" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}><b>{msg.author}:</b> {msg.content}</li>
        ))}
      </ul>
    </div>
  );
}
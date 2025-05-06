import React from 'react';
import Chat from './Chat';

export default function App() {
    return (
        <div className="app">
            <div className="chat-header">
                <h1>📬 Messagerie</h1>
                <p>Discussions en temps réel</p>
            </div>
            <Chat />
        </div>
    );
}

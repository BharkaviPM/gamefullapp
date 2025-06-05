import { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState(["Hi! I'm your assistant. What do you want to reflect on today?"]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, `You: ${input}`, `Bot: Why do you think that happened?`]);
    setInput("");
  };

  return (
    <div className="chat">
      <h3>Guided Chat</h3>
      <div className="chat-window">
        {messages.map((m, i) => <p key={i}>{m}</p>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

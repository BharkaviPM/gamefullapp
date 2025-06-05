import React, { useState } from 'react';

export default function DecisionDuel() {
  const [topic, setTopic] = useState('');
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [input, setInput] = useState('');
  const [type, setType] = useState('pro');
  const [result, setResult] = useState(null);

  const addPoint = () => {
    if (!input.trim()) return;
    type === 'pro'
      ? setPros([...pros, input])
      : setCons([...cons, input]);
    setInput('');
  };

  const decide = () => {
    const diff = pros.length - cons.length;
    if (diff > 0) setResult('✅ Go for it!');
    else if (diff < 0) setResult('❌ Maybe reconsider');
    else setResult('⚖️ It’s a tie. Reflect more.');
  };

  return (
    <div className="page">
      <h2>Decision Duel</h2>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="What's your decision about?"
        style={{ padding: 8, width: '100%', marginBottom: 10 }}
      />
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add a ${type === 'pro' ? 'Pro' : 'Con'}`}
          style={{ padding: 8, width: '70%' }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: 8 }}>
          <option value="pro">Pro</option>
          <option value="con">Con</option>
        </select>
        <button onClick={addPoint} style={buttonStyle}>Add</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Pros</h4>
        <ul>{pros.map((p, i) => <li key={i}>✅ {p}</li>)}</ul>

        <h4>Cons</h4>
        <ul>{cons.map((c, i) => <li key={i}>❌ {c}</li>)}</ul>
      </div>

      <button onClick={decide} style={{ ...buttonStyle, marginTop: 20 }}>
        Decide!
      </button>

      {result && (
        <div style={{ marginTop: 20, fontSize: '1.2rem' }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '8px 12px',
  marginLeft: 8,
  backgroundColor: '#8a6df1',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

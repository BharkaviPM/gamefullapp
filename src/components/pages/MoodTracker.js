import React, { useState } from 'react';

const moods = ['😢', '😐', '🙂', '😊', '😄'];

export default function MoodTracker() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <h2>Mood Tracker</h2>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {moods.map((mood, index) => (
          <span
            key={index}
            style={{
              fontSize: '2rem',
              cursor: 'pointer',
              opacity: selected === index ? 1 : 0.5,
            }}
            onClick={() => setSelected(index)}
          >
            {mood}
          </span>
        ))}
      </div>
      {selected !== null && <p>Your mood is: {moods[selected]}</p>}
    </div>
  );
}

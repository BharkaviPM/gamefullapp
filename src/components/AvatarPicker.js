import React from 'react';

const avatars = [
  { id: 'mickey', name: 'Mickey Mouse', src: '/avatars/micky.png' },
  { id: 'boy', name: 'Boy', src: '/avatars/boy.png' },
  { id: 'girl', name: 'Girl', src: '/avatars/girl.png' },
];

export default function AvatarPicker({ selectedAvatar, setSelectedAvatar, onNext }) {
  return (
    <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <h2>Pick your Avatar</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {avatars.map((av) => (
          <div
            key={av.id}
            onClick={() => setSelectedAvatar(av.id)}
            style={{
              cursor: 'pointer',
              border: selectedAvatar === av.id ? '3px solid #007bff' : '1px solid #ccc',
              padding: '5px',
              borderRadius: '8px',
              userSelect: 'none',
            }}
          >
            <img src={av.src} alt={av.name} width="80" height="80" />
            <p>{av.name}</p>
          </div>
        ))}
      </div>
      <button
        disabled={!selectedAvatar}
        onClick={onNext}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: selectedAvatar ? '#007bff' : '#999',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: selectedAvatar ? 'pointer' : 'not-allowed',
        }}
      >
        Next
      </button>
    </div>
  );
}

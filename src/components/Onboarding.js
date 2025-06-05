import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarPicker from './AvatarPicker';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checklistDone, setChecklistDone] = useState(false);
  const [xp, setXp] = useState(0);

  const navigate = useNavigate();

  const nextStep = () => setStep((s) => s + 1);

  const completeChecklist = () => {
    setChecklistDone(true);
    setXp((prev) => prev + 10);
    nextStep();
  };

  const handleComplete = () => {
    const userData = { email, password, avatar, username, xp };
    onComplete(userData);           // update app-level user state
    navigate('/');                  // redirect to dashboard
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      {step === 1 && (
        <div>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', width: '80%', marginBottom: 10 }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', width: '80%', marginBottom: 10 }}
          />
          <br />
          <button
            onClick={nextStep}
            style={buttonStyle}
            disabled={!email.trim() || !password.trim()}
          >
            Sign Up
          </button>
        </div>
      )}
      {step === 2 && (
        <AvatarPicker
          selectedAvatar={avatar}
          setSelectedAvatar={setAvatar}
          onNext={nextStep}
        />
      )}
      {step === 3 && (
        <div>
          <h2>Set Username</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '8px', width: '80%', marginBottom: 10 }}
          />
          <br />
          <button
            disabled={!username.trim()}
            onClick={nextStep}
            style={{ ...buttonStyle, opacity: username.trim() ? 1 : 0.5 }}
          >
            Next
          </button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Checklist</h2>
          <p>Complete this checklist to earn XP</p>
          <ul style={{ textAlign: 'left' }}>
            <li>Complete profile</li>
            <li>Explore features</li>
            <li>First quest</li>
          </ul>
          <button
            onClick={completeChecklist}
            style={buttonStyle}
            disabled={checklistDone}
          >
            {checklistDone ? 'Checklist Completed' : 'Complete Checklist'}
          </button>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2>Onboarding Complete!</h2>
          <p>XP Earned: {xp}</p>
          <button onClick={handleComplete} style={buttonStyle}>
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

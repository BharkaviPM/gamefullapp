import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarPicker from './AvatarPicker';

export default function Dashboard({ userData = {}, onLogout }) {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(userData.avatar || 'boy');
  const [username] = useState(userData.username || 'Guest');
  const [xp] = useState(userData.xp ?? 0);
  const [level] = useState(Math.floor(xp / 100) + 1);
  const [streak] = useState(3);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  // Logout dropdown state
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);

  // Change avatar handler
  const changeAvatar = (newAvatar) => {
    setAvatar(newAvatar);
    setShowAvatarPicker(false);
  };

  // Toggle side panel hamburger menu
  const toggleSidePanel = () => {
    setSidePanelOpen((open) => !open);
  };

  // Toggle logout dropdown
  const toggleLogout = () => {
    setShowLogout((show) => !show);
  };

  // Close logout menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    setShowLogout(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/components/Login');
    }
  };

  return (
    <div style={styles.container}>
      {/* Hamburger button top left */}
      <button
        aria-label="Toggle Navigation Panel"
        onClick={toggleSidePanel}
        style={styles.hamburgerButton}
      >
        {sidePanelOpen ? '×' : '☰'}
      </button>

      {/* Side navigation panel */}
      <nav
        style={{
          ...styles.sidePanel,
          left: sidePanelOpen ? 0 : -220,
        }}
      >
        <button
          style={styles.navButton}
          onClick={() => {
            navigate('/quest');
            setSidePanelOpen(false);
          }}
        >
          Go to Quest
        </button>
        <button
          style={styles.navButton}
          onClick={() => {
            navigate('/moodtracker');
            setSidePanelOpen(false);
          }}
        >
          Mood Tracker
        </button>
        <button
          style={styles.navButton}
          onClick={() => {
            navigate('/decisionduel');
            setSidePanelOpen(false);
          }}
        >
          Decision Duel
        </button>
        <button
          style={styles.navButton}
          onClick={() => {
            navigate('/chatbot');
            setSidePanelOpen(false);
          }}
        >
          Chatbot
        </button>
      </nav>

      {/* Top right avatar with logout dropdown */}
      <div style={styles.topRightAvatar} title="User Avatar" ref={logoutRef}>
        <img
          src={`/avatars/${avatar}.png`}
          alt={`${avatar} avatar`}
          style={styles.roundAvatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/avatars/micky.png';
          }}
          onClick={toggleLogout}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleLogout()}
        />
        {showLogout && (
          <div style={styles.logoutDropdown}>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>

      <h1>Welcome, {username}!</h1>

      <div style={styles.avatarSection}>
        <button
          onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          style={styles.button}
          aria-label="Change Avatar"
        >
          {showAvatarPicker ? 'Cancel' : 'Change Avatar'}
        </button>
      </div>

      {showAvatarPicker && (
        <AvatarPicker
          selectedAvatar={avatar}
          setSelectedAvatar={changeAvatar}
          onNext={() => setShowAvatarPicker(false)}
        />
      )}

      <p>
        <strong>XP:</strong> {xp}
      </p>
      <p>
        <strong>Level:</strong> {level}
      </p>
      <p>
        <strong>Streak:</strong> {streak} days
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'center',
    padding: 20,
    position: 'relative',
    minHeight: '100vh',
    overflowX: 'hidden',
  },
  topRightAvatar: {
    position: 'fixed',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: '50%',
    overflow: 'visible', // to allow dropdown outside avatar box
    border: '2px solid #007bff',
    backgroundColor: '#fff',
    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
    zIndex: 1000,
    cursor: 'pointer',
  },
  roundAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    display: 'block',
  },
  logoutDropdown: {
    position: 'absolute',
    top: '110%',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 1010,
    minWidth: 100,
  },
  logoutButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
  avatarSection: {
    marginBottom: 20,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
  hamburgerButton: {
    position: 'fixed',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
    fontSize: 24,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    zIndex: 1100,
    userSelect: 'none',
  },
  sidePanel: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 220,
    height: '100vh',
    backgroundColor: '#f0f0f0',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    paddingTop: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    transition: 'left 0.3s ease',
    zIndex: 1050,
  },
  navButton: {
    width: '90%',
    padding: '12px 15px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

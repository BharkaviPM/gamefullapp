import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Quest from './components/pages/Quest';
import MoodTracker from './components/pages/MoodTracker';
import DecisionDuel from './components/pages/DecisionDuel';
import Chatbot from './components/pages/Chatbot';

import Login from './components/Login';
import Onboarding from './components/Onboarding'; // ✅ Use Onboarding instead of Signup

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            <Onboarding
              onComplete={(data) => {
                setUser(data);
                setIsLoggedIn(true);
              }}
            />
          }
        />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <Dashboard
                  userData={user}
                  onLogout={() => {
                    setUser(null);
                    setIsLoggedIn(false);
                  }}
                />
              }
            />
            <Route path="/quest" element={<Quest />} />
            <Route path="/moodtracker" element={<MoodTracker />} />
            <Route path="/decisionduel" element={<DecisionDuel />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setUser, setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email.trim(),
        password: form.password,
      });

      setUser(res.data);
      setIsLoggedIn(true);
      setStatus({ loading: false, error: '', success: 'Login successful!' });
    } catch (err) {
      setStatus({ loading: false, error: 'Invalid email or password.', success: '' });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          style={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={styles.input}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" style={styles.button} disabled={status.loading}>
          {status.loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ marginTop: 10 }}>
          New here? <span style={styles.link} onClick={() => navigate('/onboarding')}>Sign Up</span>
        </p>

        {status.error && <p style={styles.error}>{status.error}</p>}
        {status.success && <p style={styles.success}>{status.success}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right,rgb(17, 184, 203), #2575fc)',
  },
  form: {
    background: '#fff',
    padding: '30px 40px',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: '10px 15px',
    marginTop: 15,
    backgroundColor: '#2575fc',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
  },
  link: {
    color: '#2575fc',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  success: {
    color: 'green',
    marginTop: 10,
  },
};

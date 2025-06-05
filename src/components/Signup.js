import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', username: '', age: '', goal: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        email: form.email.trim(),
        password: form.password,
        username: form.username.trim(),
        age: parseInt(form.age),
        goal: form.goal.trim(),
      });
      alert('Signed up successfully');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={e => setForm({ ...form, password: e.target.value })} />
      <input type="text" placeholder="Username" required onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="number" placeholder="Age" required onChange={e => setForm({ ...form, age: e.target.value })} />
      <input type="text" placeholder="Goal Type" required onChange={e => setForm({ ...form, goal: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

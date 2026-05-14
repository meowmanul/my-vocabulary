import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuth = async (authAction) => {
    if (!email.trim() || !password) {
      alert('Please enter email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await authAction(auth, email.trim(), password);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
      />
      <button disabled={isSubmitting} onClick={() => handleAuth(signInWithEmailAndPassword)}>
        Log in
      </button>
      <button disabled={isSubmitting} onClick={() => handleAuth(createUserWithEmailAndPassword)}>
        Sign up
      </button>
    </div>
  );
}

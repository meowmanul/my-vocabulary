import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import { auth } from './firebase';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {!currentUser ? (
        <Auth />
      ) : (
        <>
          <div className="header">
            <h2>My Vocabulary</h2>
            <button className="logout-button" onClick={() => signOut(auth)}>Log out</button>
          </div>
          <AddWord currentUser={currentUser} />
          <WordList currentUser={currentUser} />
        </>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import { auth } from './firebase';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        console.log("The user is logged in:", user.email);
      } else {
        console.log("User logged out");
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {!currentUser ? (
        <Auth />
      ) : (
        <>
          <div className="header">
          <h2>My Vocabulary</h2>
            <button onClick={() => auth.signOut()}>Log out</button>
          </div>
          <AddWord />
          <WordList currentUser={currentUser} />
        </>
      )}
    </div>
  );
}

export default App;
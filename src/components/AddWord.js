import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddWord.css';

export default function AddWord() {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser?.uid) {
      alert("Error: user is not authorized!");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, 'users', auth.currentUser.uid, 'words'), 
        {
          word,
          translation,
          createdAt: new Date(),
        }
      );
      console.log("Word added with ID:", docRef.id);
      setWord('');
      setTranslation('');
    } catch (error) {
      console.error("Total mistake:", error);
      alert("Addition error:", error.message);
    }
  };

if (!isAuthenticated) {
    return <div>Please log in to add words.</div>;
  }

  return (
    <div className="addword-container">
    <form onSubmit={handleSubmit}>
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Word"
      />
      <input
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder="Translation"
      />
      <button type="submit">Add</button>
    </form>
    </div>
  );
}
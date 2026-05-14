import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './AddWord.css';

export default function AddWord({ currentUser }) {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedWord = word.trim();
    const trimmedTranslation = translation.trim();

    if (!currentUser?.uid) {
      alert('Error: user is not authorized!');
      return;
    }

    if (!trimmedWord || !trimmedTranslation) {
      alert('Please fill in both word and translation.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'words'), {
        word: trimmedWord,
        translation: trimmedTranslation,
        createdAt: serverTimestamp(),
      });
      setWord('');
      setTranslation('');
    } catch (error) {
      console.error('Addition error:', error);
      alert(`Addition error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}

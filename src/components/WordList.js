import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './WordList.css';

const formatCreatedAt = (createdAt) => {
  if (!createdAt) {
    return 'Saving...';
  }

  if (typeof createdAt.toDate === 'function') {
    return createdAt.toDate().toLocaleString();
  }

  if (createdAt instanceof Date) {
    return createdAt.toLocaleString();
  }

  return 'Unknown date';
};

export default function WordList({ currentUser }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (!currentUser?.uid) {
      setWords([]);
      return undefined;
    }

    const wordsCollection = collection(db, 'users', currentUser.uid, 'words');
    const wordsQuery = query(wordsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(wordsQuery, (snapshot) => {
      const wordsData = snapshot.docs.map((wordDoc) => ({
        id: wordDoc.id,
        ...wordDoc.data(),
      }));
      setWords(wordsData);
    }, (error) => {
      console.error('Words loading error:', error);
      alert('Failed to load words.');
    });

    return unsubscribe;
  }, [currentUser?.uid]);

  const handleDelete = async (wordId) => {
    if (!currentUser?.uid) return;

    try {
      const docRef = doc(db, 'users', currentUser.uid, 'words', wordId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Deletion error:', error);
      alert('Failed to delete the word.');
    }
  };

  return (
    <div className="wordlist-container">
      {words.length === 0 ? (
        <p>The word list is empty</p>
      ) : (
        words.map((word) => (
          <div className="wordlist-item" key={word.id}>
            <h3>{word.word}</h3>
            <p>Translation: {word.translation}</p>
            <small className="date-text">Added: {formatCreatedAt(word.createdAt)}</small>
            <button onClick={() => handleDelete(word.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

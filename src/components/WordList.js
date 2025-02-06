import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc, } from "firebase/firestore";

export default function WordList( { currentUser } ) { 
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const wordsCollection = collection(db, 'users', currentUser.uid, 'words');
    const q = query(wordsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wordsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWords(wordsData);
    });

    return () => unsubscribe();
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
        words.map(word => (
          <div className="wordlist-item" key={word.id}>
            <h3>{word.word}</h3>
            <p className="date-text" >Translation: {word.translation}</p>
            {word.createdAt && (
              <small>Added: {word.createdAt.toLocaleString()}</small>
            )}
            <button onClick={() => handleDelete(word.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
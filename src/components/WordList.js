import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function WordList() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'words'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wordsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWords(wordsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {words.map(word => (
        <div key={word.id}>
          <h3>{word.word}</h3>
          <p>{word.translation}</p>
        </div>
      ))}
    </div>
  );
}   
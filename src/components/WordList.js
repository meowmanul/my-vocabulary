import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

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

  return (
    <div>
      {words.length === 0 ? (
        <p>Список слов пуст</p>
      ) : (
        words.map(word => (
          <div key={word.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{word.word}</h3>
            <p>Перевод: {word.translation}</p>
            {word.createdAt && (
              <small>Добавлено: {word.createdAt.toLocaleString()}</small>
            )}
          </div>
        ))
      )}
    </div>
  );
}
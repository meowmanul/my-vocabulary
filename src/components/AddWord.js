import { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddWord() {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Слово"
      />
      <input
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder="Перевод"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
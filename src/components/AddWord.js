import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddWord() {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'words'), {
        word,
        translation,
        createdAt: new Date(),
      });
      setWord('');
      setTranslation('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Слово" />
      <input value={translation} onChange={(e) => setTranslation(e.target.value)} placeholder="Перевод" />
      <button type="submit">Добавить</button>
    </form>
  );
}
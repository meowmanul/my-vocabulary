import Auth from './components/Auth';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import { auth } from './firebase';

function App() {
  return (
    <div>
      {!auth.currentUser ? (
        <Auth />
      ) : (
        <>
          <button onClick={() => auth.signOut()}>Выйти</button>
          <AddWord />
          <WordList />
        </>
      )}
    </div>
  );
}

export default App;
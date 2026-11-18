import { useEffect, useState } from 'react';

function TitleMirror() {
  const [title, setTitle] = useState('');

  useEffect(() => {
  console.log('clock started');
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => {
    console.log('clock stopped');
    clearInterval(id);
  };
}, []);

  return (
    <label>
      Tab title:{' '}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
  );
}

function SavedNote() {
  const [note, setNote] = useState(() => {
    try {
      return localStorage.getItem('lab-note') ?? '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lab-note', note);
    } catch (error) {
      console.error(error);
    }
  }, [note]);

  return (
    <label>
      Saved note:{' '}
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={() => setNote('')}>Clear saved note</button>
    </label>
  );
}

function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Time: {time.toLocaleTimeString()}</p>;
}

export default function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <main style={{ maxWidth: 640, margin: '30px auto' }}>
      <h1>Effects Lab</h1>
      <p>Three examples of syncing with the browser.</p>
      <TitleMirror />
      <hr />
      <SavedNote />
      <hr />
      <button onClick={() => setShowClock((v) => !v)}>
        {showClock ? 'Hide clock' : 'Show clock'}
      </button>
      {showClock && <LiveClock />}
      <WindowWidth />
    </main>
  );
}
function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Window width: {width}px</p>;
}
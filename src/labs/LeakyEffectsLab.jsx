import { useEffect, useState } from 'react';

function ChatRoom({ roomId }) {
  useEffect(() => {
    console.log('connect', roomId);
    return () => console.log('disconnect', roomId);
  }, [roomId]);

  return <p>Connected to room: {roomId}</p>;
}

function TimerFixed() {
  useEffect(() => {
    const id = setInterval(() => console.log('tick'), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Timer is logging "tick" in the Console.</p>;
}

function ResizeFixed() {
  useEffect(() => {
    const handleResize = () => console.log('width');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Resize the window and watch the Console.</p>;
}

function CounterFixed() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Count: {count}</p>;
}

function ProductTitle() {
  const [productName, setProductName] = useState('Phone');

  useEffect(() => {
    document.title = productName;
  }, [productName]);

  return (
    <div>
      <button onClick={() => setProductName('Phone')}>Phone</button>{' '}
      <button onClick={() => setProductName('Laptop')}>Laptop</button>{' '}
      <button onClick={() => setProductName('Headphones')}>Headphones</button>
      <p>Tab title: {productName}</p>
    </div>
  );
}

function UserDetails({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load user');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </div>
  );
}

function OptionsFixed({ roomId }) {
  useEffect(() => {
    const options = { roomId };
    console.log('Connect with', options);
  }, [roomId]);

  return <p>Options effect only restarts when the room changes.</p>;
}

export default function LeakyEffectsLab() {
  const [roomId, setRoomId] = useState('general');
  const [userId, setUserId] = useState(1);
  const [showTimer, setShowTimer] = useState(true);
  const [showResize, setShowResize] = useState(true);
  const [showCounter, setShowCounter] = useState(true);

  return (
    <section>
      <h1>Fix the Leaky Effects</h1>

      <h2>Round A: Cleanup order</h2>
      <button onClick={() => setRoomId('general')}>general</button>{' '}
      <button onClick={() => setRoomId('music')}>music</button>
      <ChatRoom roomId={roomId} />
      <OptionsFixed roomId={roomId} />
      <hr />

      <h2>Round B: Timer (snippet A)</h2>
      <button onClick={() => setShowTimer((v) => !v)}>
        {showTimer ? 'Hide timer' : 'Show timer'}
      </button>
      {showTimer && <TimerFixed />}
      <hr />

      <h2>Round C: Resize listener (snippet B)</h2>
      <button onClick={() => setShowResize((v) => !v)}>
        {showResize ? 'Hide listener' : 'Show listener'}
      </button>
      {showResize && <ResizeFixed />}
      <hr />

      <h2>Round D: Stale counter (snippet C)</h2>
      <button onClick={() => setShowCounter((v) => !v)}>
        {showCounter ? 'Hide counter' : 'Show counter'}
      </button>
      {showCounter && <CounterFixed />}
      <hr />

      <h2>Tab title (snippet D)</h2>
      <ProductTitle />
      <hr />

      <h2>Round E: User details (snippet E)</h2>
      {[1, 2, 3, 4, 5].map((id) => (
        <button key={id} onClick={() => setUserId(id)}>
          User {id}
        </button>
      ))}
      <UserDetails userId={userId} />
    </section>
  );
}
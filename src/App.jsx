import { useState } from 'react';
import EffectsLab from './labs/EffectsLab';
import LeakyEffectsLab from './labs/LeakyEffectsLab';

export default function App() {
  const [lab, setLab] = useState('effects');

  return (
    <main style={{ maxWidth: 640, margin: '30px auto', padding: '0 16px' }}>
      <nav>
        <button onClick={() => setLab('effects')}>Lab 12: Effects</button>{' '}
        <button onClick={() => setLab('leaky')}>Lab 15: Leaky Effects</button>
      </nav>
      <hr />
      {lab === 'effects' ? <EffectsLab /> : <LeakyEffectsLab />}
    </main>
  );
}
import React, { useState } from 'react';
import './styles.css';

interface CounterGameProps {}

const CounterGame: React.FC<CounterGameProps> = () => {
  const [count, setCount] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleClick = () => {
    setCount(prev => prev + 1);
    setAnimationClass('pulse');
    setTimeout(() => setAnimationClass(''), 500);
  };

  return (
    <div className="counter-game">
      <button 
        className={`counter-button ${animationClass}`}
        onClick={handleClick}
      >
        Click me!
      </button>
      <div className="counter-display">
        <h2>Count: {count}</h2>
      </div>
    </div>
  );
};

export default CounterGame;

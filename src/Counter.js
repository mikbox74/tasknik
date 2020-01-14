import React from 'react';

export default   function Counter({initialCount}) {
  const [count, setCount] = React.useState(initialCount);
  
  return (
    <>
      Значение счетчика: {count}
      <button onClick={() => setCount(initialCount)}>Сброс</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}
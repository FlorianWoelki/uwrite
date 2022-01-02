import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <p className="text-4xl">Hello Vite + React!</p>
      <p className="text-2xl mt-8">
        <button
          className="bg-blue-400 p-4 text-white rounded"
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          count is: {count}
        </button>
      </p>
    </div>
  );
}

export default App;

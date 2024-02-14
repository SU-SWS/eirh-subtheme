import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className="text-digital-red">Vite + React</h2>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App

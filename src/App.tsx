import { useState } from 'react'
import { Button } from "@/components/ui/button"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-3xl bg-blue-500">Tailwind Css 적용 테스트</div>;
      <Button>Click me</Button>

    </>
  )
}

export default App

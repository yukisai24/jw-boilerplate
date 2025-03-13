import { useState } from 'react'
import { Button } from "@/components/ui/button"


function App() {

  return (
    <>
      <div className="text-3xl bg-blue-500">Tailwind Css 적용 테스트</div>
      <Button>Click me</Button>
      <Button variant="destructive">Click me</Button>

    </>
  )
}

export default App

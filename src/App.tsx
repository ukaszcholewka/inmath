import { FC, useEffect, useRef } from 'react'
import InMath from './InMath'

const App: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    new InMath(inputRef.current!, {
      onEnter: true
    })
  })

  return (
    <div>
      <div>
        <input ref={inputRef} />
      </div>
    </div>
  )
}

export default App;
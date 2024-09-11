import { useState } from 'react'
import { Timer } from '../..'

export const Pomodoro = () => {
  const [isWorking, setIsWorking] = useState(true)
  const [cycles, setCycles] = useState(0)

  const handleComplete = () => {
    setIsWorking(!isWorking)
    if (!isWorking) {
      setCycles(cycles + 1)
    }
  }

  return (
    <Timer.Root
      targetMs={isWorking ? 25 * 60 * 1000 : 5 * 60 * 1000}
      countdown
      onComplete={handleComplete}
    >
      <h2>{isWorking ? 'Work Session' : 'Break Session'}</h2>
      <Timer.Item type="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <Timer.Item type="seconds" />

      <div>
        <Timer.ActionTrigger action="start">Start</Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
        <Timer.ActionTrigger action="reset">Reset</Timer.ActionTrigger>
      </div>
      <p>Completed cycles: {cycles}</p>
    </Timer.Root>
  )
}

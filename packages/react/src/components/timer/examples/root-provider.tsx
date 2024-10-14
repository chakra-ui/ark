import { Timer, useTimer } from '@ark-ui/react/timer'

export const RootProvider = () => {
  const timer = useTimer({ targetMs: 60 * 60 * 1000 })

  return (
    <>
      <button onClick={() => timer.pause()}>Pause</button>

      <Timer.RootProvider value={timer}>
        <Timer.Area>
          <Timer.Item type="days" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="hours" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="minutes" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="seconds" />
        </Timer.Area>
        <Timer.Control>
          <Timer.ActionTrigger action="start">Play</Timer.ActionTrigger>
          <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
          <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
        </Timer.Control>
      </Timer.RootProvider>
    </>
  )
}

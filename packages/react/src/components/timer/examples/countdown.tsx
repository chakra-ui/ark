import { Timer } from '@ark-ui/react/timer'

export const Countdown = () => (
  <Timer.Root autoStart countdown startMs={60 * 60 * 500}>
    <Timer.Area>
      <Timer.Item type="days" />
      <Timer.Separator>:</Timer.Separator>
      <Timer.Item type="hours" />
      <Timer.Separator>:</Timer.Separator>
      <Timer.Item type="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <Timer.Item type="seconds" />
    </Timer.Area>
  </Timer.Root>
)

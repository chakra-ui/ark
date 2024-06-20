import { Timer } from '../..'

export const Countdown = () => (
  <Timer.Root countdown autoStart startMs={60 * 60 * 500}>
    <Timer.Item type="days" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="hours" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="minutes" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="seconds" />
  </Timer.Root>
)

import { Timer } from '../..'

export const Basic = () => (
  <Timer.Root countdown targetMs={60 * 60 * 1000} onPlay={() => console.log('Play stopwatch')}>
    <Timer.Item type="days" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="hours" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="minutes" />
    <Timer.Separator>:</Timer.Separator>
    <Timer.Item type="seconds" />

    <Timer.ActionTrigger action="start">Play!</Timer.ActionTrigger>
    <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
  </Timer.Root>
)

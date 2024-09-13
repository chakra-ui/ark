import { Timer } from '../'

export const ComponentUnderTest = () => (
  <Timer.Root>
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
    </Timer.Control>
  </Timer.Root>
)

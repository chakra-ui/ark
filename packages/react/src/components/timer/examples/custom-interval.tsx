import { Timer } from '@ark-ui/react/timer'

export const CustomInterval = () => (
  <Timer.Root interval={500} targetMs={10 * 1000}>
    <Timer.Area>
      <Timer.Item type="seconds" />
      <Timer.Separator>.</Timer.Separator>
      <Timer.Item type="milliseconds" />
    </Timer.Area>
  </Timer.Root>
)

import { Timer } from '../..'

export const CustomInterval = () => (
  <Timer.Root interval={500} targetMs={10 * 1000}>
    <Timer.Item type="seconds" />
    <Timer.Separator>.</Timer.Separator>
    <Timer.Item type="milliseconds" />
  </Timer.Root>
)

import { Meter } from '../index.ts'

export const ComponentUnderTest = (props: Meter.RootProps) => (
  <Meter.Root {...props}>
    <Meter.Label>Storage used</Meter.Label>
    <Meter.ValueText />
    <Meter.Track>
      <Meter.Indicator />
    </Meter.Track>
  </Meter.Root>
)

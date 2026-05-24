import { ToggleGroup } from '../index.ts'

export const ComponentUnderTest = (props: ToggleGroup.RootProps) => (
  <ToggleGroup.Root {...props}>
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.Root>
)

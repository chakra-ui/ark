import { ToggleGroup, type ToggleGroupRootProps } from '../'

export const ComponentUnderTest = (props: ToggleGroupRootProps) => (
  <ToggleGroup.Root {...props}>
    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
  </ToggleGroup.Root>
)

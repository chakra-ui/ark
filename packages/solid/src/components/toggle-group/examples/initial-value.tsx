import { ToggleGroup } from '@ark-ui/solid/toggle-group'

export const InitialValue = () => {
  return (
    <ToggleGroup.Root value={['b']}>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

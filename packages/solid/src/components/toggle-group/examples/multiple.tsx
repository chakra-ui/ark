import { ToggleGroup } from '@ark-ui/solid/toggle-group'

export const Multiple = () => {
  return (
    <ToggleGroup.Root multiple>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

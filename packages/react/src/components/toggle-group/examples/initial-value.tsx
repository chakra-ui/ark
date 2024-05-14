import { ToggleGroup } from '../..'

export const InitialValue = () => {
  return (
    <ToggleGroup.Root defaultValue={['b']}>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

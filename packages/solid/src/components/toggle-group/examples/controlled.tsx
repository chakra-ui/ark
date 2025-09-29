import { ToggleGroup } from '@ark-ui/solid/toggle-group'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal<string[]>(['a'])

  return (
    <>
      <p>Value: {value().join(', ')}</p>
      <ToggleGroup.Root value={value()} onValueChange={(details) => setValue(details.value)}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup.Root>
    </>
  )
}

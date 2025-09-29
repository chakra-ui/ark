import { Checkbox } from '@ark-ui/solid/checkbox'
import { Check } from 'lucide-solid'
import { createSignal, For } from 'solid-js'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

export const GroupControlled = () => {
  const [value, setValue] = createSignal(['react'])

  const toggleValue = () => {
    setValue((prev) => (prev[0] === 'react' ? ['solid'] : ['react']))
  }

  return (
    <>
      <button onClick={toggleValue}>Toggle Value</button>
      <Checkbox.Group value={value} onValueChange={setValue} name="framework">
        <For each={items}>
          {(item) => (
            <Checkbox.Root value={item.value}>
              <Checkbox.Label>{item.label}</Checkbox.Label>
              <Checkbox.Control>
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          )}
        </For>
      </Checkbox.Group>
    </>
  )
}

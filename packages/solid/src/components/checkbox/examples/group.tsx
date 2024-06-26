import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Checkbox, CheckboxGroup } from '../..'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

export const Group = () => (
  <CheckboxGroup defaultValue={['react']} name="framework" onValueChange={console.log}>
    <For each={items}>
      {(item) => (
        <Checkbox.Root value={item.value}>
          <Checkbox.Label>{item.label}</Checkbox.Label>
          <Checkbox.Control>
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      )}
    </For>
  </CheckboxGroup>
)

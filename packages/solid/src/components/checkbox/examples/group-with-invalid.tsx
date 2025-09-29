import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const GroupWithInvalid = () => (
  <Checkbox.Group invalid>
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
  </Checkbox.Group>
)

import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-solid'
import { For, createSignal, createMemo } from 'solid-js'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const GroupWithSelectAll = () => {
  const [value, setValue] = createSignal<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    setValue(checked ? items.map((item) => item.value) : [])
  }

  const allSelected = createMemo(() => value().length === items.length)
  const indeterminate = createMemo(() => value().length > 0 && value().length < items.length)

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '10px' }}>
      <Checkbox.Root
        checked={indeterminate() ? 'indeterminate' : allSelected()}
        onCheckedChange={(details) => handleSelectAll(!!details.checked)}
      >
        <Checkbox.Label>Select All</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
          <Checkbox.Indicator indeterminate>
            <MinusIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.Root>

      <Checkbox.Group value={value} onValueChange={setValue} name="framework">
        <For each={items}>
          {(item) => (
            <Checkbox.Root value={item.value}>
              <Checkbox.Label>{item.label}</Checkbox.Label>
              <Checkbox.Control>
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
                <Checkbox.Indicator indeterminate>
                  <MinusIcon />
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          )}
        </For>
      </Checkbox.Group>

      <pre>Selected: {JSON.stringify(value())}</pre>
    </div>
  )
}

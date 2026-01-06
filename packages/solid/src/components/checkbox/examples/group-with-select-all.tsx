import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-solid'
import { For, createSignal, createMemo } from 'solid-js'
import styles from 'styles/checkbox.module.css'

const CheckboxItem = (props: Checkbox.RootProps) => (
  <Checkbox.Root class={styles.Root} {...props}>
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator class={styles.Indicator} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>{props.children}</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)

export const GroupWithSelectAll = () => {
  const [value, setValue] = createSignal<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    setValue(checked ? items.map((item) => item.value) : [])
  }

  const allSelected = createMemo(() => value().length === items.length)
  const indeterminate = createMemo(() => value().length > 0 && value().length < items.length)

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '10px' }}>
      <output>Selected: {JSON.stringify(value())}</output>

      <CheckboxItem
        checked={indeterminate() ? 'indeterminate' : allSelected()}
        onCheckedChange={(details) => handleSelectAll(!!details.checked)}
      >
        JSX Frameworks
      </CheckboxItem>

      <Checkbox.Group
        class={styles.Group}
        style={{ 'margin-inline-start': '1rem' }}
        value={value()}
        onValueChange={setValue}
        name="framework"
      >
        <For each={items}>{(item) => <CheckboxItem value={item.value}>{item.label}</CheckboxItem>}</For>
      </Checkbox.Group>
    </div>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

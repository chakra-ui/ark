import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import { createSignal, For } from 'solid-js'
import styles from 'styles/checkbox.module.css'

export const GroupControlled = () => {
  const [value, setValue] = createSignal(['react'])

  return (
    <div>
      <Checkbox.Group class={styles.Group} value={value} onValueChange={setValue} name="framework">
        <For each={items}>
          {(item) => (
            <Checkbox.Root class={styles.Root} value={item.value}>
              <Checkbox.Control class={styles.Control}>
                <Checkbox.Indicator class={styles.Indicator}>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label class={styles.Label}>{item.label}</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          )}
        </For>
      </Checkbox.Group>
      <pre>Selected: {JSON.stringify(value())}</pre>
    </div>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

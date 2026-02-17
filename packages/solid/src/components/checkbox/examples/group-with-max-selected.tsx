import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/checkbox.module.css'

export const GroupWithMaxSelected = () => (
  <Checkbox.Group class={styles.Group} defaultValue={['react']} maxSelectedValues={2} name="framework">
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
)

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

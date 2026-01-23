import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

export const GroupWithForm = () => (
  <form
    class="stack"
    onSubmit={(e) => {
      e.preventDefault()
      console.log(new FormData(e.currentTarget).getAll('framework'))
    }}
  >
    <Checkbox.Group class={styles.Group} defaultValue={['react']} name="framework">
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
    <button class={button.Root} type="submit">
      Submit
    </button>
  </form>
)

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

import { Checkbox } from '@ark-ui/solid/checkbox'
import { Fieldset } from '@ark-ui/solid/fieldset'
import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/checkbox.module.css'
import fieldset from 'styles/fieldset.module.css'

export const GroupWithFieldset = () => (
  <Fieldset.Root class={fieldset.Root}>
    <Fieldset.Legend class={fieldset.Legend}>Select frameworks</Fieldset.Legend>
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
    <Fieldset.HelperText class={fieldset.HelperText}>Choose your preferred frameworks</Fieldset.HelperText>
  </Fieldset.Root>
)

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

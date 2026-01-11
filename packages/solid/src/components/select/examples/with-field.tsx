import { Field } from '@ark-ui/solid/field'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { Index } from 'solid-js/web'
import field from 'styles/field.module.css'
import styles from 'styles/select.module.css'

export const WithField = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Field.Root class={field.Root}>
      <Select.Root collection={collection} class={styles.Root}>
        <Select.Label class={styles.Label}>Label</Select.Label>
        <Select.Control class={styles.Control}>
          <Select.Trigger class={styles.Trigger}>
            <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
            <Select.Indicator class={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content class={styles.Content}>
            <Index each={collection.items}>
              {(item) => (
                <Select.Item class={styles.Item} item={item()}>
                  <Select.ItemText class={styles.ItemText}>{item()}</Select.ItemText>
                  <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                </Select.Item>
              )}
            </Index>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
      <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
      <Field.ErrorText class={field.ErrorText}>Error Info</Field.ErrorText>
    </Field.Root>
  )
}

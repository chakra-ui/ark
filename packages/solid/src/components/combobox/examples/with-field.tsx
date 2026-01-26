import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { Field } from '@ark-ui/solid/field'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import styles from 'styles/combobox.module.css'
import field from 'styles/field.module.css'

const initialItems = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
]

export const WithField = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Field.Root class={field.Root}>
      <Combobox.Root class={styles.Root} collection={collection()} onInputValueChange={handleInputChange}>
        <Combobox.Label class={styles.Label}>Department</Combobox.Label>
        <Combobox.Control class={styles.Control}>
          <Combobox.Input class={styles.Input} placeholder="e.g. Engineering" />
          <div class={styles.Indicators}>
            <Combobox.ClearTrigger class={styles.ClearTrigger}>Clear</Combobox.ClearTrigger>
            <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
          </div>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item class={styles.Item} item={item}>
                  <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
      <Field.HelperText class={field.HelperText}>Select your primary department</Field.HelperText>
      <Field.ErrorText class={field.ErrorText}>Department is required</Field.ErrorText>
    </Field.Root>
  )
}

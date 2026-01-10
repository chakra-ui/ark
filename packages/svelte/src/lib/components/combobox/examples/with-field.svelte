<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { Field } from '@ark-ui/svelte/field'
  import { useFilter } from '@ark-ui/svelte/locale'
  import styles from 'styles/combobox.module.css'
  import field from 'styles/field.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const initialItems = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Finance', value: 'finance' },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Field.Root class={field.Root}>
  <Combobox.Root class={styles.Root} {collection} onInputValueChange={handleInputChange}>
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
        {#each collection().items as item (item.value)}
          <Combobox.Item class={styles.Item} {item}>
            <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
            <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
  <Field.HelperText class={field.HelperText}>Select your primary department</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Department is required</Field.ErrorText>
</Field.Root>

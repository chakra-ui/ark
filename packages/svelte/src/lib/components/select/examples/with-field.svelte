<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import field from 'styles/field.module.css'
  import styles from 'styles/select.module.css'

  const collection = createListCollection({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })
</script>

<Field.Root class={field.Root}>
  <Select.Root {collection} class={styles.Root}>
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
        {#each collection.items as item}
          <Select.Item class={styles.Item} {item}>
            <Select.ItemText class={styles.ItemText}>{item}</Select.ItemText>
            <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
  <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Error Info</Field.ErrorText>
</Field.Root>

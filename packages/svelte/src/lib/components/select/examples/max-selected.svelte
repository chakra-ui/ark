<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  // biome-ignore lint/style/useImportType: intentional
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon, XIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'

  const items = ['React', 'Solid', 'Vue', 'Svelte']
  const MAX_SELECTION = 2
  const hasReachedMax = (value: string[]) => value.length >= MAX_SELECTION

  let value = $state<string[]>([])

  const collection = $derived(
    createListCollection({
      items: items.map((item) => ({
        label: item,
        value: item,
        disabled: hasReachedMax(value) && !value.includes(item),
      })),
    }),
  )

  const handleValueChange = (details: Select.ValueChangeDetails) => {
    if (hasReachedMax(value) && details.value.length > value.length) return
    value = details.value
  }
</script>

<Select.Root class={styles.Root} {collection} multiple {value} onValueChange={handleValueChange}>
  <Select.Label class={styles.Label}>Framework</Select.Label>
  <Select.Control class={styles.Control}>
    <Select.Trigger class={styles.Trigger}>
      <Select.ValueText class={styles.ValueText} placeholder="Select" />
      <Select.Indicator class={styles.Indicator}>
        <ChevronsUpDownIcon />
      </Select.Indicator>
    </Select.Trigger>
    <Select.ClearTrigger class={styles.ClearTrigger}>
      <XIcon />
    </Select.ClearTrigger>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content class={styles.Content}>
        <Select.ItemGroup class={styles.ItemGroup}>
          <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
          {#each collection.items as item (item.value)}
            <Select.Item class={styles.Item} {item}>
              <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
              <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>

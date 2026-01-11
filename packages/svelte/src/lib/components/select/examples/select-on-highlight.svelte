<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection, useSelect } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'

  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })

  const select = useSelect({
    collection: frameworks,
    onHighlightChange({ highlightedValue }) {
      if (highlightedValue) {
        select().selectValue(highlightedValue)
      }
    },
  })
</script>

<Select.RootProvider class={styles.Root} value={select}>
  <Select.Label class={styles.Label}>Framework</Select.Label>
  <Select.Control class={styles.Control}>
    <Select.Trigger class={styles.Trigger}>
      <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
      <Select.Indicator class={styles.Indicator}>
        <ChevronsUpDownIcon />
      </Select.Indicator>
    </Select.Trigger>
    <Select.ClearTrigger class={styles.ClearTrigger}>Clear</Select.ClearTrigger>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content class={styles.Content}>
        <Select.ItemGroup class={styles.ItemGroup}>
          <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
          {#each frameworks.items as item}
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
</Select.RootProvider>

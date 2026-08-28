<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'
  import button from 'styles/button.module.css'

  const collection = createListCollection({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })
</script>

<Select.Root class={styles.Root} {collection}>
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
        <Select.Context>
          {#snippet render(api)}
            <button
              class={button.Root}
              type="button"
              style="width: 100%; margin-bottom: 0.25rem"
              onclick={() => {
                api().selectAll()
                api().setOpen(false)
              }}
            >
              Select All
            </button>
          {/snippet}
        </Select.Context>
        {#each collection.items as item}
          <Select.Item class={styles.Item} {item}>
            <Select.ItemText class={styles.ItemText}>{item}</Select.ItemText>
            <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>

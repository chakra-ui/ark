<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  // biome-ignore lint/style/useImportType: intentional
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'

  function loadData() {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => resolve(['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Ember']), 500)
    })
  }

  let data = $state<string[] | null>(null)
  let loading = $state(false)
  let error = $state<Error | null>(null)

  const collection = $derived(
    createListCollection({
      items: data ?? [],
    }),
  )

  const handleOpenChange = (details: Select.OpenChangeDetails) => {
    if (details.open && data === null) {
      loading = true
      error = null
      loadData()
        .then((result) => {
          data = result
        })
        .catch((err) => {
          error = err
        })
        .finally(() => {
          loading = false
        })
    }
  }
</script>

<Select.Root class={styles.Root} {collection} onOpenChange={handleOpenChange}>
  <Select.Label class={styles.Label}>Framework</Select.Label>
  <Select.Control class={styles.Control}>
    <Select.Trigger class={styles.Trigger}>
      <Select.ValueText class={styles.ValueText} placeholder="Select" />
      <Select.Indicator class={styles.Indicator}>
        <ChevronsUpDownIcon />
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content class={styles.Content}>
        <Select.Status>
          {#if loading}
            <div class={styles.Status}>Loading...</div>
          {:else if error}
            <div class={styles.Status}>Error: {error.message}</div>
          {/if}
        </Select.Status>
        <Select.List class={styles.List}>
          {#each collection.items as item}
            <Select.Item class={styles.Item} {item}>
              <Select.ItemText class={styles.ItemText}>{item}</Select.ItemText>
              <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>

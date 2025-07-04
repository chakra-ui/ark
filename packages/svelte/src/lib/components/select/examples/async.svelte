<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  // biome-ignore lint/style/useImportType: <explanation>
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronDownIcon } from 'lucide-svelte'

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

<Select.Root {collection} onOpenChange={handleOpenChange}>
  <Select.Label>Framework</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select" />
      <Select.Indicator>
        <ChevronDownIcon />
      </Select.Indicator>
    </Select.Trigger>
    <Select.ClearTrigger>Clear</Select.ClearTrigger>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content>
        {#if loading}
          <div>Loading...</div>
        {:else if error}
          <div>Error: {error.message}</div>
        {:else}
          {#each collection.items as item}
            <Select.Item {item}>
              <Select.ItemText>{item}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          {/each}
        {/if}
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>

<script lang="ts">
  import { Combobox, useCombobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { Portal } from '@ark-ui/svelte/portal'
  import { useAsync } from './use-async.svelte'

  interface Character {
    name: string
    height: string
    mass: string
    created: string
    edited: string
    url: string
  }

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  let inputValue = $state('')

  const combobox = useCombobox(() => ({
    collection: collection(),
    defaultValue: ['C-3PO'],
    placeholder: 'Example: Dexter',
    inputValue,
    onInputValueChange: (e) => {
      inputValue = e.inputValue
    },
  }))

  const fetchData = $derived(async (signal: AbortSignal | null) => {
    const response = await fetch(`https://swapi.py4e.com/api/people/?search=${inputValue}`, { signal })
    const data = await response.json()
    set(data.results)
  })

  const _state = useAsync(() => fetchData)

  $effect(() => {
    void inputValue
    void _state.load()
  })

  // The meat of the example is here.
  // It rehydrates the input value when the combobox is mounted.
  let hydrated = false
  $effect.pre(() => {
    if (combobox().value.length && combobox().collection.size && !hydrated) {
      combobox().syncSelectedItems()
      hydrated = true
    }
  })
</script>

<Combobox.RootProvider value={combobox}>
  <Combobox.Label>Search Star Wars Characters</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input placeholder="Type to search" />
  </Combobox.Control>

  <Portal>
    <Combobox.Positioner>
      <Combobox.Content>
        {#if _state.loading()}
          <span>Loading...</span>
        {:else if _state.error()}
          <span>{_state.error()?.message}</span>
        {:else}
          {#each collection().items as item (item.name)}
            <Combobox.Item {item}>
              <span>
                {item.name} - {item.height}cm / {item.mass}kg
              </span>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          {/each}
        {/if}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.RootProvider>

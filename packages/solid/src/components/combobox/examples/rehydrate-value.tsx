import { Combobox, useCombobox, useComboboxContext, useListCollection } from '@ark-ui/solid/combobox'
import { For, createEffect, createRenderEffect, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useAsync } from './use-async'

// The meat of the example is here.
// It rehydrates the input value when the combobox is mounted.
function ComboboxRehydrateValue() {
  const combobox = useComboboxContext()
  let hydrated = false

  createRenderEffect(() => {
    if (combobox().value.length && combobox().collection.size && !hydrated) {
      combobox().syncSelectedItems()
      hydrated = true
    }
  })

  return null
}

export const RehydrateValue = () => {
  const [inputValue, setInputValue] = createSignal('')

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const combobox = useCombobox(() => ({
    collection: collection(),
    defaultValue: ['C-3PO'],
    placeholder: 'Example: Dexter',
    inputValue: inputValue(),
    onInputValueChange: (e) => setInputValue(e.inputValue),
  }))

  const state = useAsync(async (signal) => {
    const response = await fetch(`https://swapi.py4e.com/api/people/?search=${inputValue()}`, { signal })
    const data = await response.json()
    set(data.results)
  })

  createEffect(() => {
    void inputValue()
    void state.load()
  })

  return (
    <Combobox.RootProvider value={combobox}>
      <Combobox.Label>Search Star Wars Characters</Combobox.Label>
      <ComboboxRehydrateValue />
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {state.loading() ? (
              <span>Loading...</span>
            ) : state.error() ? (
              <span>{state.error()?.message}</span>
            ) : (
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item item={item}>
                    <span>
                      {item.name} - {item.height}cm / {item.mass}kg
                    </span>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )}
              </For>
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}

interface Character {
  name: string
  height: string
  mass: string
  created: string
  edited: string
  url: string
}

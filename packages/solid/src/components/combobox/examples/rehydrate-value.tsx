import { Combobox, useCombobox, useComboboxContext, useListCollection } from '@ark-ui/solid/combobox'
import { For, createEffect, createRenderEffect, createSignal, on } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'
import { useAsync } from './use-async'

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

  createEffect(on(inputValue, () => state.load()))

  return (
    <Combobox.RootProvider class={styles.Root} value={combobox}>
      <Combobox.Label class={styles.Label}>Search Star Wars Characters</Combobox.Label>
      <ComboboxRehydrateValue />
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. Luke" />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
            {state.loading() ? (
              <span style={{ padding: '0.5rem' }}>Loading...</span>
            ) : state.error() ? (
              <span style={{ padding: '0.5rem' }}>{state.error()?.message}</span>
            ) : (
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item class={styles.Item} item={item}>
                    <Combobox.ItemText class={styles.ItemText}>
                      {item.name} - {item.height}cm / {item.mass}kg
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
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

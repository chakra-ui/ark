import { Combobox, useCombobox, useComboboxContext, useListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { useRef, useState } from 'react'
import { useAsync } from 'react-use'

// The meat of the example is here.
// It rehydrates the input value when the combobox is mounted.
function ComboboxRehydrateValue() {
  const combobox = useComboboxContext()
  const hydrated = useRef(false)
  if (combobox.value.length && combobox.collection.size && !hydrated.current) {
    const inputValue = combobox.collection.stringify(combobox.value[0])
    combobox.setInputValue(inputValue || '')
    hydrated.current = true
  }
  return null
}

export const RehydrateValue = () => {
  const [inputValue, setInputValue] = useState('')

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const combobox = useCombobox({
    collection,
    defaultValue: ['C-3PO'],
    placeholder: 'Example: Dexter',
    inputValue,
    onInputValueChange: (e) => setInputValue(e.inputValue),
  })

  const state = useAsync(async () => {
    const response = await fetch(`https://swapi.py4e.com/api/people/?search=${inputValue}`)
    const data = await response.json()
    set(data.results)
  }, [inputValue, set])

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
            {state.loading ? (
              <span>Loading...</span>
            ) : state.error ? (
              <span>{state.error.message}</span>
            ) : (
              collection.items.map((item) => (
                <Combobox.Item key={item.name} item={item}>
                  <span>
                    {item.name} - {item.height}cm / {item.mass}kg
                  </span>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))
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

import { Combobox, useCombobox, useComboboxContext, useListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useAsync } from 'react-use'
import styles from 'styles/combobox.module.css'

function ComboboxRehydrateValue() {
  const combobox = useComboboxContext()
  const hydrated = useRef(false)
  if (combobox.value.length && combobox.collection.size && !hydrated.current) {
    combobox.syncSelectedItems()
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
    <Combobox.RootProvider className={styles.Root} value={combobox}>
      <Combobox.Label className={styles.Label}>Search Star Wars Characters</Combobox.Label>
      <ComboboxRehydrateValue />
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Luke" />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={styles.Content}>
            {state.loading ? (
              <span style={{ padding: '0.5rem' }}>Loading...</span>
            ) : state.error ? (
              <span style={{ padding: '0.5rem' }}>{state.error.message}</span>
            ) : (
              collection.items.map((item) => (
                <Combobox.Item className={styles.Item} key={item.name} item={item}>
                  <Combobox.ItemText className={styles.ItemText}>
                    {item.name} - {item.height}cm / {item.mass}kg
                  </Combobox.ItemText>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
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

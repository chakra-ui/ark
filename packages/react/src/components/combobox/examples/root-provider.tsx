import { Combobox, createListCollection, useCombobox } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { useMemo, useState } from 'react'

const initialItems = ['React', 'Solid', 'Vue']

export const RootProvider = () => {
  const [items, setItems] = useState(initialItems)

  const collection = useMemo(() => createListCollection({ items }), [items])

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(
      initialItems.filter((item) => item.toLowerCase().includes(details.inputValue.toLowerCase())),
    )
  }

  const combobox = useCombobox({ collection: collection, onInputValueChange: handleInputChange })

  return (
    <>
      <button onClick={() => combobox.focus()}>Focus</button>

      <Combobox.RootProvider value={combobox}>
        <Combobox.Label>Framework</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>Open</Combobox.Trigger>
          <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.ItemGroup>
                <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
                {collection.items.map((item) => (
                  <Combobox.Item key={item} item={item}>
                    <Combobox.ItemText>{item}</Combobox.ItemText>
                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.RootProvider>
    </>
  )
}

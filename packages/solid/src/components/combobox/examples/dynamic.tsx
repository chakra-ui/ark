import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'

const suggestList = ['gmail.com', 'yahoo.com', 'ark-ui.com']

export const Dynamic = () => {
  const { collection, set } = useListCollection<string>({
    initialItems: [],
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    if (details.reason === 'input-change') {
      const items = suggestList.map((item) => `${details.inputValue}@${item}`)
      set(items)
    }
  }

  return (
    <Combobox.Root collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item item={item}>
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

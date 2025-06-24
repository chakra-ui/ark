import { Listbox, createListCollection, useListbox } from '@ark-ui/solid/listbox'
import { Index } from 'solid-js'

export const RootProvider = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
  const listbox = useListbox({ collection: collection })

  return (
    <Listbox.RootProvider value={listbox}>
      <Listbox.Label>Select your Framework</Listbox.Label>
      <Listbox.Content>
        <Index each={collection.items}>
          {(item) => (
            <Listbox.Item item={item()}>
              <Listbox.ItemText>{item()}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </Index>
      </Listbox.Content>
    </Listbox.RootProvider>
  )
}

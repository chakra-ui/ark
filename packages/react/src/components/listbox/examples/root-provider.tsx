import { Listbox, createListCollection, useListbox } from '@ark-ui/react/listbox'

export const RootProvider = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })
  const listbox = useListbox({ collection: collection })

  return (
    <Listbox.RootProvider value={listbox}>
      <Listbox.Label>Select your Framework</Listbox.Label>
      <Listbox.Content>
        {collection.items.map((item) => (
          <Listbox.Item key={item} item={item}>
            <Listbox.ItemText>{item}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.RootProvider>
  )
}

import { Listbox, createListCollection } from '@ark-ui/react/listbox'

export const Basic = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  return (
    <Listbox.Root collection={collection}>
      <Listbox.Label>Select your Framework</Listbox.Label>
      <Listbox.Content>
        {collection.items.map((item) => (
          <Listbox.Item key={item} item={item}>
            <Listbox.ItemText>{item}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

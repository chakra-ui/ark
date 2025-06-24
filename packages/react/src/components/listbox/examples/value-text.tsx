import { Listbox, createListCollection } from '@ark-ui/react/listbox'

export const ValueText = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Listbox.Root defaultValue={['React']} collection={collection} selectionMode="multiple">
      <Listbox.Label>
        Select your Framework: <Listbox.ValueText />
      </Listbox.Label>
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

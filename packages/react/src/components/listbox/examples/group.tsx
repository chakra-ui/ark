import { Listbox, createListCollection } from '@ark-ui/react/listbox'

export const Group = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Svelte', value: 'solid', disabled: true },
      { label: 'Vue', value: 'vue' },
    ],
  })

  return (
    <Listbox.Root collection={collection}>
      <Listbox.Label>Select your Frameworks</Listbox.Label>
      <Listbox.Content>
        <Listbox.ItemGroup>
          <Listbox.ItemGroupLabel>JS Frameworks</Listbox.ItemGroupLabel>
          {collection.items.map((item) => (
            <Listbox.Item key={item.value} item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.ItemGroup>
      </Listbox.Content>
    </Listbox.Root>
  )
}

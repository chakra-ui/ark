import { Listbox, createListCollection } from '@ark-ui/react/listbox'

export const Group = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react', type: 'JS' },
      { label: 'Solid', value: 'solid', type: 'JS' },
      { label: 'Vue', value: 'vue', type: 'JS' },
      { label: 'Panda', value: 'panda', type: 'CSS' },
      { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
    ],
    groupBy: (item) => item.type,
  })

  return (
    <Listbox.Root collection={collection}>
      <Listbox.Label>Select your Frameworks</Listbox.Label>
      <Listbox.Content>
        {collection.group().map(([type, group]) => (
          <Listbox.ItemGroup key={type}>
            <Listbox.ItemGroupLabel>{type}</Listbox.ItemGroupLabel>
            {group.map((item) => (
              <Listbox.Item key={item.value} item={item}>
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

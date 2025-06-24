import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { useState } from 'react'

export const Controlled = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
  const [value, setValue] = useState(['React'])

  return (
    <Listbox.Root value={value} onValueChange={(e) => setValue(e.value)} collection={collection}>
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

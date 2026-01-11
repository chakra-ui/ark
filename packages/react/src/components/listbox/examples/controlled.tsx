import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/listbox.module.css'

export const Controlled = () => {
  const collection = createListCollection({
    items: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
  })
  const [value, setValue] = useState(['md'])

  return (
    <Listbox.Root
      className={styles.Root}
      collection={collection}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Listbox.Label className={styles.Label}>Select Size</Listbox.Label>
      <Listbox.Content className={styles.Content}>
        {collection.items.map((item) => (
          <Listbox.Item className={styles.Item} key={item.value} item={item}>
            <Listbox.ItemText className={styles.ItemText}>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/listbox.module.css'

export const Multiple = () => {
  const collection = createListCollection({
    items: [
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' },
      { label: 'Sunday', value: 'sun' },
    ],
  })

  return (
    <Listbox.Root className={styles.Root} collection={collection} selectionMode="multiple">
      <Listbox.Label className={styles.Label}>Select Days</Listbox.Label>
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

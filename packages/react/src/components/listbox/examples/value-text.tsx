import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/listbox.module.css'

export const ValueText = () => {
  const collection = createListCollection({
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Purple', value: 'purple' },
    ],
  })

  return (
    <Listbox.Root
      className={styles.Root}
      collection={collection}
      selectionMode="multiple"
      defaultValue={['red', 'blue']}
    >
      <Listbox.Label className={styles.Label}>
        Colors: <Listbox.ValueText className={styles.ValueText} />
      </Listbox.Label>
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

import { Listbox, createListCollection, useListbox } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/listbox.module.css'

export const RootProvider = () => {
  const collection = createListCollection({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
  })
  const listbox = useListbox({ collection })

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => listbox.setValue(['high'])}>
        Set to High
      </button>
      <Listbox.RootProvider className={styles.Root} value={listbox}>
        <Listbox.Label className={styles.Label}>Select Priority</Listbox.Label>
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
      </Listbox.RootProvider>
    </div>
  )
}

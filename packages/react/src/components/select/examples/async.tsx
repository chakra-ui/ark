import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/select.module.css'

function loadData() {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Ember']), 500)
  })
}

export const Async = () => {
  const [items, setItems] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const collection = createListCollection<string>({
    items: items || [],
  })

  const handleOpenChange = (details: Select.OpenChangeDetails) => {
    if (details.open && items == null) {
      setLoading(true)
      setError(null)
      loadData()
        .then((data) => setItems(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Select.Root className={styles.Root} collection={collection} onOpenChange={handleOpenChange}>
      <Select.Label className={styles.Label}>Framework</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select" />
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            {loading ? (
              <div className={styles.Item}>Loading...</div>
            ) : error ? (
              <div className={styles.Item}>Error: {error.message}</div>
            ) : (
              collection.items.map((item) => (
                <Select.Item className={styles.Item} key={item} item={item}>
                  <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                  <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                </Select.Item>
              ))
            )}
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

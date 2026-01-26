import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon } from 'lucide-react'
import styles from 'styles/select.module.css'

export const LazyMount = () => {
  const collection = createListCollection({
    items: ['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Alpine'],
  })

  return (
    <Select.Root className={styles.Root} collection={collection} lazyMount unmountOnExit>
      <Select.Label className={styles.Label}>Framework</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger className={styles.ClearTrigger}>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            <Select.ItemGroup className={styles.ItemGroup}>
              <Select.ItemGroupLabel className={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
              {collection.items.map((item) => (
                <Select.Item className={styles.Item} key={item} item={item}>
                  <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                  <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection, useSelect } from '@ark-ui/react/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

export const RootProvider = () => {
  const select = useSelect({ collection: frameworks })

  return (
    <>
      <output>selected: {JSON.stringify(select.value)}</output>

      <Select.RootProvider className={styles.Root} value={select}>
        <Select.Label className={styles.Label}>Framework</Select.Label>
        <Select.Control className={styles.Control}>
          <Select.Trigger className={styles.Trigger}>
            <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
          </Select.Trigger>
          <div className={styles.Indicators}>
            <Select.ClearTrigger className={styles.ClearTrigger}>
              <XIcon />
            </Select.ClearTrigger>
            <Select.Indicator className={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </div>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content className={styles.Content}>
              <Select.ItemGroup className={styles.ItemGroup}>
                <Select.ItemGroupLabel className={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
                {frameworks.items.map((item) => (
                  <Select.Item className={styles.Item} key={item.value} item={item}>
                    <Select.ItemText className={styles.ItemText}>{item.label}</Select.ItemText>
                    <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.RootProvider>
    </>
  )
}

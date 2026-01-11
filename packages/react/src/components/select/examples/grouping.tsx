import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react', type: 'JS' },
    { label: 'Solid', value: 'solid', type: 'JS' },
    { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
    { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
  ],
  groupBy: (item) => item.type,
})

export const Grouping = () => {
  return (
    <Select.Root className={styles.Root} collection={frameworks}>
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
            {frameworks.group().map(([type, group]) => (
              <Select.ItemGroup className={styles.ItemGroup} key={type}>
                <Select.ItemGroupLabel className={styles.ItemGroupLabel}>{type}</Select.ItemGroupLabel>
                {group.map((item) => (
                  <Select.Item className={styles.Item} key={item.value} item={item}>
                    <Select.ItemText className={styles.ItemText}>{item.label}</Select.ItemText>
                    <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

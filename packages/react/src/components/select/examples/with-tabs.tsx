import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { Tabs } from '@ark-ui/react/tabs'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import styles from 'styles/select.module.css'
import tabs from 'styles/tabs.module.css'

export const WithTabs = () => {
  const [tab, setTab] = useState('branches')
  const [value, setValue] = useState(['main'])

  const collection = useMemo(() => createListCollection({ items: refs[tab] }), [tab])

  return (
    <Select.Root
      className={styles.Root}
      collection={collection}
      value={value}
      onValueChange={(details) => setValue(details.value)}
    >
      <Select.Label className={styles.Label}>Switch branches or tags</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText}>{value[0]}</Select.ValueText>
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner className={styles.Positioner}>
          <Select.Content className={styles.Content}>
            <Tabs.Root
              className={tabs.Root}
              value={tab}
              onValueChange={(details) => details.value && setTab(details.value)}
              lazyMount
              unmountOnExit
            >
              <Tabs.List className={tabs.List}>
                <Tabs.Trigger className={tabs.Trigger} value="branches">
                  Branches
                </Tabs.Trigger>
                <Tabs.Trigger className={tabs.Trigger} value="tags">
                  Tags
                </Tabs.Trigger>
              </Tabs.List>
              {Object.keys(refs).map((key) => (
                <Tabs.Content key={key} value={key} className={tabs.Content}>
                  <Select.List className={styles.List}>
                    {collection.items.map((item) => (
                      <Select.Item className={styles.Item} key={item} item={item}>
                        <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                        <Select.ItemIndicator className={styles.ItemIndicator}>
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const refs: Record<string, string[]> = {
  branches: ['main', 'develop', 'feat/date-input', 'feat/listbox-grid', 'fix/menu-focus'],
  tags: ['v6.0.0', 'v5.36.1', 'v5.36.0', 'v5.35.2', 'v5.35.1'],
}

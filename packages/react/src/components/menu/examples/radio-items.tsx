import { Menu } from '@ark-ui/react/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/menu.module.css'

export const RadioItems = () => {
  const [sortBy, setSortBy] = useState('date')

  return (
    <Menu.Root>
      <Menu.Trigger className={styles.Trigger}>
        Sort
        <Menu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.Content}>
          <Menu.RadioItemGroup className={styles.ItemGroup} value={sortBy} onValueChange={(e) => setSortBy(e.value)}>
            <Menu.ItemGroupLabel className={styles.ItemGroupLabel}>Sort By</Menu.ItemGroupLabel>
            <Menu.RadioItem className={styles.RadioItem} value="name">
              <Menu.ItemIndicator className={styles.ItemIndicator}>
                <CheckIcon />
              </Menu.ItemIndicator>
              <Menu.ItemText className={styles.ItemText}>Name</Menu.ItemText>
            </Menu.RadioItem>
            <Menu.RadioItem className={styles.RadioItem} value="date">
              <Menu.ItemIndicator className={styles.ItemIndicator}>
                <CheckIcon />
              </Menu.ItemIndicator>
              <Menu.ItemText className={styles.ItemText}>Date Modified</Menu.ItemText>
            </Menu.RadioItem>
            <Menu.RadioItem className={styles.RadioItem} value="size">
              <Menu.ItemIndicator className={styles.ItemIndicator}>
                <CheckIcon />
              </Menu.ItemIndicator>
              <Menu.ItemText className={styles.ItemText}>Size</Menu.ItemText>
            </Menu.RadioItem>
            <Menu.RadioItem className={styles.RadioItem} value="type">
              <Menu.ItemIndicator className={styles.ItemIndicator}>
                <CheckIcon />
              </Menu.ItemIndicator>
              <Menu.ItemText className={styles.ItemText}>Type</Menu.ItemText>
            </Menu.RadioItem>
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

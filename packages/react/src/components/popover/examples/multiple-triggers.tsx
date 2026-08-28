import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

interface Item {
  id: string
  label: string
  detail: string
}

const items: Item[] = [
  { id: 'share', label: 'Share', detail: 'Share this item with others via link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive for later reference.' },
]

export const MultipleTriggers = () => {
  const [activeItem, setActiveItem] = useState<Item | null>(null)

  return (
    <Popover.Root
      onTriggerValueChange={(e) => {
        setActiveItem(items.find((i) => i.id === e.value) ?? null)
      }}
    >
      <div className={button.Group}>
        {items.map((item) => (
          <Popover.Trigger key={item.id} value={item.id} className={button.Root}>
            {item.label}
          </Popover.Trigger>
        ))}
      </div>
      <Portal>
        <Popover.Positioner className={styles.Positioner}>
          <Popover.Content className={styles.Content}>
            <Popover.Title className={styles.Title}>{activeItem?.label ?? 'Select an action'}</Popover.Title>
            <Popover.Description className={styles.Description}>
              {activeItem?.detail ?? 'Click a button above'}
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

import { Popover } from '@ark-ui/solid/popover'
import { Portal } from 'solid-js/web'
import { For, createSignal } from 'solid-js'
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
  const [activeItem, setActiveItem] = createSignal<Item | null>(null)

  return (
    <Popover.Root
      onTriggerValueChange={(e) => {
        setActiveItem(items.find((i) => i.id === e.value) ?? null)
      }}
    >
      <div class={button.Group}>
        <For each={items}>
          {(item) => (
            <Popover.Trigger value={item.id} class={button.Root}>
              {item.label}
            </Popover.Trigger>
          )}
        </For>
      </div>
      <Portal>
        <Popover.Positioner class={styles.Positioner}>
          <Popover.Content class={styles.Content}>
            <Popover.Title class={styles.Title}>{activeItem()?.label ?? 'Select an action'}</Popover.Title>
            <Popover.Description class={styles.Description}>
              {activeItem()?.detail ?? 'Click a button above'}
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

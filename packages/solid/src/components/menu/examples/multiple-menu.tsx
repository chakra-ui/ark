import { Menu as ArkMenu } from '@ark-ui/solid'
import { ChevronDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/menu.module.css'

interface MenuItem {
  label: string
  value: string
}

interface MenuProps {
  id: string
  label: string
  items: MenuItem[]
  onSelect?: (value: string) => void
}

const Menu = (props: MenuProps) => {
  return (
    <ArkMenu.Root onSelect={(e) => props.onSelect?.(e.value)} id={props.id}>
      <ArkMenu.Trigger class={styles.Trigger}>
        {props.label}
        <ArkMenu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </ArkMenu.Indicator>
      </ArkMenu.Trigger>
      <ArkMenu.Positioner>
        <ArkMenu.Content class={styles.Content}>
          <For each={props.items}>
            {(item) => (
              <ArkMenu.Item class={styles.Item} value={item.value}>
                {item.label}
              </ArkMenu.Item>
            )}
          </For>
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </ArkMenu.Root>
  )
}

const fileItems = [
  { label: 'New File', value: 'new' },
  { label: 'Open...', value: 'open' },
  { label: 'Save', value: 'save' },
]

const editItems = [
  { label: 'Undo', value: 'undo' },
  { label: 'Redo', value: 'redo' },
  { label: 'Cut', value: 'cut' },
  { label: 'Copy', value: 'copy' },
]

export const MultipleMenu = () => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <Menu id="file" label="File" items={fileItems} />
    <Menu id="edit" label="Edit" items={editItems} />
  </div>
)

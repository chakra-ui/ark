import { useListCollection } from '@ark-ui/react/collection'
import { useFilter } from '@ark-ui/react/locale'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from 'styles/menu.module.css'

export const Filtering = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [view, setView] = useState<string[]>(['details'])

  const { collection, filter } = useListCollection({
    initialItems: actions,
    filter: contains,
    groupBy: (item) => item.group,
  })

  const viewOptions = viewItems.filter((item) => contains(item.label, query))

  const handleQueryChange = (value: string) => {
    setQuery(value)
    filter(value)
  }

  return (
    <Menu.Root composite={false} onExitComplete={() => handleQueryChange('')}>
      <Menu.Trigger className={styles.Trigger}>
        Actions
        <Menu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={styles.Content}>
            <div className={styles.InputControl}>
              <Menu.Input
                ref={inputRef}
                className={styles.Input}
                aria-label="Filter actions"
                placeholder="Search actions..."
                value={query}
                onChange={(event) => handleQueryChange(event.currentTarget.value)}
              />
              {query && (
                <button
                  type="button"
                  className={styles.InputClear}
                  tabIndex={-1}
                  aria-hidden
                  onClick={() => {
                    handleQueryChange('')
                    inputRef.current?.focus()
                  }}
                >
                  <XIcon />
                </button>
              )}
            </div>
            {collection.size === 0 && viewOptions.length === 0 && <div className={styles.Empty}>No actions found</div>}
            <Menu.List className={styles.List}>
              {collection.group().map(([group, items]) => (
                <Menu.ItemGroup className={styles.ItemGroup} key={group}>
                  <Menu.ItemGroupLabel className={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
                  {items.map((item) => (
                    <Menu.Item className={styles.Item} key={item.value} value={item.value}>
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              ))}
              {viewOptions.length > 0 && (
                <Menu.ItemGroup className={styles.ItemGroup}>
                  <Menu.ItemGroupLabel className={styles.ItemGroupLabel}>View</Menu.ItemGroupLabel>
                  {viewOptions.map((item) => (
                    <Menu.CheckboxItem
                      className={styles.CheckboxItem}
                      key={item.value}
                      value={item.value}
                      closeOnSelect={false}
                      checked={view.includes(item.value)}
                      onCheckedChange={(checked) =>
                        setView((prev) => (checked ? [...prev, item.value] : prev.filter((v) => v !== item.value)))
                      }
                    >
                      <Menu.ItemIndicator className={styles.ItemIndicator}>
                        <CheckIcon />
                      </Menu.ItemIndicator>
                      <Menu.ItemText className={styles.ItemText}>{item.label}</Menu.ItemText>
                    </Menu.CheckboxItem>
                  ))}
                </Menu.ItemGroup>
              )}
            </Menu.List>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const actions = [
  { label: 'New file', value: 'new-file', group: 'File' },
  { label: 'Open file', value: 'open-file', group: 'File' },
  { label: 'Save', value: 'save', group: 'File' },
  { label: 'Save as', value: 'save-as', group: 'File' },
  { label: 'Rename', value: 'rename', group: 'File' },
  { label: 'Duplicate', value: 'duplicate', group: 'Organize' },
  { label: 'Move to trash', value: 'trash', group: 'Organize' },
  { label: 'Download a copy', value: 'download', group: 'Organize' },
  { label: 'Share link', value: 'share', group: 'Share' },
  { label: 'Invite people', value: 'invite', group: 'Share' },
]

const viewItems = [
  { label: 'Show details', value: 'details' },
  { label: 'Show sidebar', value: 'sidebar' },
  { label: 'Keep available offline', value: 'offline' },
]

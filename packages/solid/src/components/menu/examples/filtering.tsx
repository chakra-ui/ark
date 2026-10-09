import { useListCollection } from '@ark-ui/solid/collection'
import { useFilter } from '@ark-ui/solid/locale'
import { Menu } from '@ark-ui/solid/menu'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/menu.module.css'

export const Filtering = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  let inputRef: HTMLInputElement | undefined
  const [query, setQuery] = createSignal('')
  const [view, setView] = createSignal<string[]>(['details'])

  const { collection, filter } = useListCollection({
    initialItems: actions,
    filter: contains,
    groupBy: (item) => item.group,
  })

  const viewOptions = () => viewItems.filter((item) => contains(item.label, query()))

  const handleQueryChange = (value: string) => {
    setQuery(value)
    filter(value)
  }

  return (
    <Menu.Root composite={false} onExitComplete={() => handleQueryChange('')}>
      <Menu.Trigger class={styles.Trigger}>
        Actions
        <Menu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={styles.Content}>
            <div class={styles.InputControl}>
              <Menu.Input
                ref={inputRef}
                class={styles.Input}
                aria-label="Filter actions"
                placeholder="Search actions..."
                value={query()}
                onInput={(event) => handleQueryChange(event.currentTarget.value)}
              />
              <Show when={query()}>
                <button
                  type="button"
                  class={styles.InputClear}
                  tabIndex={-1}
                  aria-hidden
                  onClick={() => {
                    handleQueryChange('')
                    inputRef?.focus()
                  }}
                >
                  <XIcon />
                </button>
              </Show>
            </div>
            <Show when={collection().size === 0 && viewOptions().length === 0}>
              <div class={styles.Empty}>No actions found</div>
            </Show>
            <Menu.List class={styles.List}>
              <For each={collection().group()}>
                {([group, items]) => (
                  <Menu.ItemGroup class={styles.ItemGroup}>
                    <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
                    <For each={items}>
                      {(item) => (
                        <Menu.Item class={styles.Item} value={item.value}>
                          {item.label}
                        </Menu.Item>
                      )}
                    </For>
                  </Menu.ItemGroup>
                )}
              </For>
              <Show when={viewOptions().length > 0}>
                <Menu.ItemGroup class={styles.ItemGroup}>
                  <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>View</Menu.ItemGroupLabel>
                  <For each={viewOptions()}>
                    {(item) => (
                      <Menu.CheckboxItem
                        class={styles.CheckboxItem}
                        value={item.value}
                        closeOnSelect={false}
                        checked={view().includes(item.value)}
                        onCheckedChange={(checked) =>
                          setView((prev) => (checked ? [...prev, item.value] : prev.filter((v) => v !== item.value)))
                        }
                      >
                        <Menu.ItemIndicator class={styles.ItemIndicator}>
                          <CheckIcon />
                        </Menu.ItemIndicator>
                        <Menu.ItemText class={styles.ItemText}>{item.label}</Menu.ItemText>
                      </Menu.CheckboxItem>
                    )}
                  </For>
                </Menu.ItemGroup>
              </Show>
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

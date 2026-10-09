import { useListCollection } from '@ark-ui/solid/collection'
import { useFilter } from '@ark-ui/solid/locale'
import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/menu.module.css'

export const FilteringSubmenu = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [query, setQuery] = createSignal('')
  const [folderQuery, setFolderQuery] = createSignal('')

  const actionList = useListCollection({ initialItems: fileActions, filter: contains })
  const folderList = useListCollection({ initialItems: folders, filter: contains })

  const handleQueryChange = (value: string) => {
    setQuery(value)
    actionList.filter(value)
  }

  const handleFolderQueryChange = (value: string) => {
    setFolderQuery(value)
    folderList.filter(value)
  }

  const showMoveTo = () => contains('Move to folder', query())
  const showShare = () => contains('Share', query())
  const isEmpty = () => actionList.collection().size === 0 && !showMoveTo() && !showShare()

  return (
    <Menu.Root composite={false} onExitComplete={() => handleQueryChange('')}>
      <Menu.Trigger class={styles.Trigger}>
        File
        <Menu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={styles.Content}>
            <Menu.Input
              class={styles.Input}
              aria-label="Filter actions"
              placeholder="Search actions..."
              value={query()}
              onInput={(event) => handleQueryChange(event.currentTarget.value)}
            />
            <Show when={isEmpty()}>
              <div class={styles.Empty}>No actions found</div>
            </Show>
            <Menu.List class={styles.List}>
              <For each={actionList.collection().items}>
                {(item) => (
                  <Menu.Item class={styles.Item} value={item.value}>
                    {item.label}
                  </Menu.Item>
                )}
              </For>
              <Show when={showMoveTo()}>
                <Menu.Root composite={false} onExitComplete={() => handleFolderQueryChange('')}>
                  <Menu.TriggerItem class={styles.TriggerItem}>Move to folder</Menu.TriggerItem>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content class={styles.Content}>
                        <Menu.Input
                          class={styles.Input}
                          aria-label="Filter folders"
                          placeholder="Search folders..."
                          value={folderQuery()}
                          onInput={(event) => handleFolderQueryChange(event.currentTarget.value)}
                        />
                        <Show when={folderList.collection().size === 0}>
                          <div class={styles.Empty}>No folders found</div>
                        </Show>
                        <Menu.List class={styles.List}>
                          <For each={folderList.collection().items}>
                            {(item) => (
                              <Menu.Item class={styles.Item} value={item.value}>
                                {item.label}
                              </Menu.Item>
                            )}
                          </For>
                        </Menu.List>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Show>
              <Show when={showShare()}>
                <Menu.Root>
                  <Menu.TriggerItem class={styles.TriggerItem}>Share</Menu.TriggerItem>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content class={styles.Content}>
                        <For each={sharingOptions}>
                          {(option) => (
                            <Menu.Item class={styles.Item} value={option.value}>
                              {option.label}
                            </Menu.Item>
                          )}
                        </For>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Show>
            </Menu.List>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const fileActions = [
  { label: 'Rename', value: 'rename' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Download a copy', value: 'download' },
  { label: 'Delete', value: 'delete' },
]

const folders = [
  { label: 'Inbox', value: 'inbox' },
  { label: 'Projects', value: 'projects' },
  { label: 'Archive', value: 'archive' },
  { label: 'Design reviews', value: 'design-reviews' },
  { label: 'Personal', value: 'personal' },
  { label: 'Receipts', value: 'receipts' },
]

const sharingOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Message', value: 'message' },
  { label: 'Copy link', value: 'copy-link' },
]

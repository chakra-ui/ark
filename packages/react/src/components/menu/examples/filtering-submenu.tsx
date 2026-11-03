import { useListCollection } from '@ark-ui/react/collection'
import { useFilter } from '@ark-ui/react/locale'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/menu.module.css'

export const FilteringSubmenu = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [query, setQuery] = useState('')
  const [folderQuery, setFolderQuery] = useState('')

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

  const showMoveTo = contains('Move to folder', query)
  const showShare = contains('Share', query)
  const isEmpty = actionList.collection.size === 0 && !showMoveTo && !showShare

  return (
    <Menu.Root composite={false} onExitComplete={() => handleQueryChange('')}>
      <Menu.Trigger className={styles.Trigger}>
        File
        <Menu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={styles.Content}>
            <Menu.Input
              className={styles.Input}
              aria-label="Filter actions"
              placeholder="Search actions..."
              value={query}
              onChange={(event) => handleQueryChange(event.currentTarget.value)}
            />
            {isEmpty && <div className={styles.Empty}>No actions found</div>}
            <Menu.List className={styles.List}>
              {actionList.collection.items.map((item) => (
                <Menu.Item className={styles.Item} key={item.value} value={item.value}>
                  {item.label}
                </Menu.Item>
              ))}
              {showMoveTo && (
                <Menu.Root composite={false} onExitComplete={() => handleFolderQueryChange('')}>
                  <Menu.TriggerItem className={styles.TriggerItem}>Move to folder</Menu.TriggerItem>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content className={styles.Content}>
                        <Menu.Input
                          className={styles.Input}
                          aria-label="Filter folders"
                          placeholder="Search folders..."
                          value={folderQuery}
                          onChange={(event) => handleFolderQueryChange(event.currentTarget.value)}
                        />
                        {folderList.collection.size === 0 && <div className={styles.Empty}>No folders found</div>}
                        <Menu.List className={styles.List}>
                          {folderList.collection.items.map((item) => (
                            <Menu.Item className={styles.Item} key={item.value} value={item.value}>
                              {item.label}
                            </Menu.Item>
                          ))}
                        </Menu.List>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              )}
              {showShare && (
                <Menu.Root>
                  <Menu.TriggerItem className={styles.TriggerItem}>Share</Menu.TriggerItem>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content className={styles.Content}>
                        {sharingOptions.map((option) => (
                          <Menu.Item className={styles.Item} key={option.value} value={option.value}>
                            {option.label}
                          </Menu.Item>
                        ))}
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              )}
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

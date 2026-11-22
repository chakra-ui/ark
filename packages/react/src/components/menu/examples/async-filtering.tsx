import { useAsyncList } from '@ark-ui/react/collection'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/menu.module.css'

export const AsyncFiltering = () => {
  const [assignee, setAssignee] = useState('')

  const list = useAsyncList<string>({
    initialItems: people,
    async load({ filter, signal }) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      if (signal?.aborted) return { items: [] }
      const query = filter?.toLowerCase() ?? ''
      return { items: people.filter((person) => person.toLowerCase().includes(query)) }
    },
  })

  return (
    <Menu.Root popupType="dialog" onExitComplete={() => list.setFilter('')}>
      <Menu.Trigger className={styles.Trigger}>
        {assignee || 'Assign'}
        <Menu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner className={styles.Positioner}>
          <Menu.Content className={styles.Content}>
            <Menu.Input
              className={styles.Input}
              aria-label="Search people"
              placeholder="Search people..."
              value={list.filter ?? ''}
              onChange={(event) => list.setFilter(event.currentTarget.value)}
            />
            {list.isLoading && <div className={styles.Empty}>Searching...</div>}
            {!list.isLoading && list.items.length === 0 && <div className={styles.Empty}>No people found</div>}
            <Menu.List className={styles.List}>
              <Menu.RadioItemGroup
                className={styles.ItemGroup}
                value={assignee}
                onValueChange={(details) => setAssignee(details.value)}
              >
                {list.items.map((person) => (
                  <Menu.RadioItem className={styles.RadioItem} key={person} value={person}>
                    <Menu.ItemIndicator className={styles.ItemIndicator}>
                      <CheckIcon />
                    </Menu.ItemIndicator>
                    <Menu.ItemText className={styles.ItemText}>{person}</Menu.ItemText>
                  </Menu.RadioItem>
                ))}
              </Menu.RadioItemGroup>
            </Menu.List>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const people = [
  'Ada Lovelace',
  'Alan Turing',
  'Barbara Liskov',
  'Dennis Ritchie',
  'Grace Hopper',
  'Katherine Johnson',
  'Ken Thompson',
  'Linus Torvalds',
  'Margaret Hamilton',
  'Tim Berners-Lee',
]

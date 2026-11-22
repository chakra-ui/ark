import { useAsyncList } from '@ark-ui/solid/collection'
import { Menu } from '@ark-ui/solid/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
import { Portal } from '@solidjs/web'
import styles from 'styles/menu.module.css'

export const AsyncFiltering = () => {
  const [assignee, setAssignee] = createSignal('')

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
    <Menu.Root popupType="dialog" onExitComplete={() => list().setFilter('')}>
      <Menu.Trigger class={styles.Trigger}>
        {assignee() || 'Assign'}
        <Menu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner class={styles.Positioner}>
          <Menu.Content class={styles.Content}>
            <Menu.Input
              class={styles.Input}
              aria-label="Search people"
              placeholder="Search people..."
              value={list().filter ?? ''}
              onInput={(event) => list().setFilter(event.currentTarget.value)}
            />
            <Show when={list().isLoading}>
              <div class={styles.Empty}>Searching...</div>
            </Show>
            <Show when={!list().isLoading && list().items.length === 0}>
              <div class={styles.Empty}>No people found</div>
            </Show>
            <Menu.List class={styles.List}>
              <Menu.RadioItemGroup
                class={styles.ItemGroup}
                value={assignee()}
                onValueChange={(details) => setAssignee(details.value)}
              >
                <For each={list().items}>
                  {(person) => (
                    <Menu.RadioItem class={styles.RadioItem} value={person}>
                      <Menu.ItemIndicator class={styles.ItemIndicator}>
                        <CheckIcon />
                      </Menu.ItemIndicator>
                      <Menu.ItemText class={styles.ItemText}>{person}</Menu.ItemText>
                    </Menu.RadioItem>
                  )}
                </For>
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

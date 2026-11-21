import { Command, createListCollection } from '@ark-ui/solid/command'
import { SearchIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'calendar', label: 'Calendar', group: 'Suggestions' },
    { value: 'emoji', label: 'Search emoji', group: 'Suggestions' },
    { value: 'calculator', label: 'Calculator', group: 'Suggestions', disabled: true },
    { value: 'profile', label: 'Profile', group: 'Settings' },
    { value: 'billing', label: 'Billing', group: 'Settings' },
    { value: 'preferences', label: 'Preferences', group: 'Settings' },
  ],
  groupBy: (item) => item.group,
})

export const Groups = () => (
  <Command.Root class={styles.Root} collection={collection}>
    <Command.Label class={styles.Label}>Commands</Command.Label>
    <Command.Control class={styles.Control}>
      <SearchIcon />
      <Command.Input class={styles.Input} placeholder="Search..." />
    </Command.Control>
    <Command.Context>
      {(command) => (
        <Command.List class={styles.List}>
          <For each={command().collection.group()} keyed={([group]) => group}>
            {(entry) => (
              <Command.ItemGroup class={styles.ItemGroup}>
                <Command.ItemGroupLabel class={styles.ItemGroupLabel}>{entry()[0]}</Command.ItemGroupLabel>
                <For each={entry()[1]}>
                  {(item) => (
                    <Command.Item item={item} class={styles.Item}>
                      <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
                    </Command.Item>
                  )}
                </For>
              </Command.ItemGroup>
            )}
          </For>
        </Command.List>
      )}
    </Command.Context>
    <Command.Empty class={styles.Empty}>No results found</Command.Empty>
  </Command.Root>
)

import { Command, createListCollection } from '@ark-ui/solid/command'
import { ChevronRightIcon, SearchIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
import styles from 'styles/command.module.css'

const collection = createListCollection({
  items: [
    { value: 'theme', label: 'Change theme' },
    { value: 'language', label: 'Change language' },
    { value: 'sign-out', label: 'Sign out' },
    { value: 'light', label: 'Light', parent: 'theme' },
    { value: 'dark', label: 'Dark', parent: 'theme' },
    { value: 'system', label: 'System', parent: 'theme' },
    { value: 'english', label: 'English', parent: 'language' },
    { value: 'french', label: 'French', parent: 'language' },
  ],
})

export const Pages = () => {
  const [selected, setSelected] = createSignal<string | null>(null)

  return (
    <div class="stack">
      <output>Selected: {selected() ?? 'none'}</output>
      <Command.Root class={styles.Root} collection={collection} onSelect={(details) => setSelected(details.itemValue)}>
        <Command.Label class={styles.Label}>Settings</Command.Label>
        <Command.Context>
          {(command) => (
            <>
              <div class={styles.Breadcrumb}>
                <button type="button" onClick={() => command().setPage(null)}>
                  Home
                </button>
                <For each={command().pages}>
                  {(page) => (
                    <span>
                      <ChevronRightIcon />
                      <button type="button" onClick={() => command().setPage(page.value)}>
                        {page.label}
                      </button>
                    </span>
                  )}
                </For>
              </div>
              <Command.Control class={styles.Control}>
                <SearchIcon />
                <Command.Input
                  class={styles.Input}
                  placeholder={command().page ? 'Search... (Backspace to go back)' : 'Search settings...'}
                />
              </Command.Control>
              <Command.List class={styles.List}>
                <For each={command().collection.items}>
                  {(item) => (
                    <Command.Item item={item} class={styles.Item}>
                      <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
                      <Show when={command().isPage(item)}>
                        <ChevronRightIcon />
                      </Show>
                    </Command.Item>
                  )}
                </For>
              </Command.List>
            </>
          )}
        </Command.Context>
        <Command.Empty class={styles.Empty}>No results found</Command.Empty>
      </Command.Root>
    </div>
  )
}

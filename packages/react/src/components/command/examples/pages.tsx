import { Command, createListCollection } from '@ark-ui/react/command'
import { ChevronRightIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
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
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="stack">
      <output>Selected: {selected ?? 'none'}</output>
      <Command.Root
        className={styles.Root}
        collection={collection}
        onSelect={(details) => setSelected(details.itemValue)}
      >
        <Command.Label className={styles.Label}>Settings</Command.Label>
        <Command.Context>
          {(command) => (
            <>
              <div className={styles.Breadcrumb}>
                <button type="button" onClick={() => command.setPage(null)}>
                  Home
                </button>
                {command.pages.map((page) => (
                  <span key={page.value}>
                    <ChevronRightIcon />
                    <button type="button" onClick={() => command.setPage(page.value)}>
                      {page.label}
                    </button>
                  </span>
                ))}
              </div>
              <Command.Control className={styles.Control}>
                <SearchIcon />
                <Command.Input
                  className={styles.Input}
                  placeholder={command.page ? 'Search... (Backspace to go back)' : 'Search settings...'}
                />
              </Command.Control>
              <Command.List className={styles.List}>
                {command.collection.items.map((item) => (
                  <Command.Item key={item.value} item={item} className={styles.Item}>
                    <Command.ItemText className={styles.ItemText}>{item.label}</Command.ItemText>
                    {command.isPage(item) && <ChevronRightIcon />}
                  </Command.Item>
                ))}
              </Command.List>
            </>
          )}
        </Command.Context>
        <Command.Empty className={styles.Empty}>No results found</Command.Empty>
      </Command.Root>
    </div>
  )
}

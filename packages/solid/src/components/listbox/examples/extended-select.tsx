import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const ExtendedSelect = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Preact', value: 'preact' },
    ],
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection} selectionMode="extended">
      <Listbox.Label class={styles.Label}>
        Hold <kbd>⌘</kbd> or <kbd>Ctrl</kbd> to select multiple
      </Listbox.Label>
      <Listbox.Content class={styles.Content}>
        <Listbox.List class={styles.List}>
          <Index each={collection.items}>
            {(item) => (
              <Listbox.Item class={styles.Item} item={item()}>
                <Listbox.ItemText class={styles.ItemText}>{item().label}</Listbox.ItemText>
                <Listbox.ItemIndicator class={styles.ItemIndicator}>
                  <CheckIcon />
                </Listbox.ItemIndicator>
              </Listbox.Item>
            )}
          </Index>
        </Listbox.List>
      </Listbox.Content>
    </Listbox.Root>
  )
}

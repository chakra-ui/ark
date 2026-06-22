import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const ValueText = () => {
  const collection = createListCollection({
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Purple', value: 'purple' },
    ],
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection} selectionMode="multiple" defaultValue={['red', 'blue']}>
      <Listbox.Label class={styles.Label}>
        Colors: <Listbox.ValueText class={styles.ValueText} />
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

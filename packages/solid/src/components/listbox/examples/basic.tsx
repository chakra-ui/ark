import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const Basic = () => {
  const collection = createListCollection({
    items: [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Canada', value: 'ca' },
      { label: 'Australia', value: 'au' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Japan', value: 'jp' },
    ],
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection}>
      <Listbox.Label class={styles.Label}>Select Country</Listbox.Label>
      <Listbox.Content class={styles.Content}>
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
      </Listbox.Content>
    </Listbox.Root>
  )
}

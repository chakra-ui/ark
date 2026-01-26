import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const Controlled = () => {
  const collection = createListCollection({
    items: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
  })
  const [value, setValue] = createSignal(['md'])

  return (
    <Listbox.Root class={styles.Root} collection={collection} value={value()} onValueChange={(e) => setValue(e.value)}>
      <Listbox.Label class={styles.Label}>Select Size</Listbox.Label>
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

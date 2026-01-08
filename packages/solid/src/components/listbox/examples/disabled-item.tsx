import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const DisabledItem = () => {
  const collection = createListCollection({
    items: [
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'enterprise', disabled: true },
      { label: 'Custom', value: 'custom' },
    ],
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection}>
      <Listbox.Label class={styles.Label}>Select Plan</Listbox.Label>
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

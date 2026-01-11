import { Listbox, createListCollection, useListbox } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/listbox.module.css'

export const RootProvider = () => {
  const collection = createListCollection({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
  })
  const listbox = useListbox({ collection })

  return (
    <div class="stack">
      <button class={button.Root} onClick={() => listbox().setValue(['high'])}>
        Set to High
      </button>
      <Listbox.RootProvider class={styles.Root} value={listbox}>
        <Listbox.Label class={styles.Label}>Select Priority</Listbox.Label>
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
      </Listbox.RootProvider>
    </div>
  )
}

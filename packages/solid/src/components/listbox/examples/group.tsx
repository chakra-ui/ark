import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const Group = () => {
  const collection = createListCollection({
    items: [
      { label: 'New York', value: 'nyc', region: 'North America' },
      { label: 'Los Angeles', value: 'lax', region: 'North America' },
      { label: 'Toronto', value: 'yyz', region: 'North America' },
      { label: 'London', value: 'lhr', region: 'Europe' },
      { label: 'Paris', value: 'cdg', region: 'Europe' },
      { label: 'Berlin', value: 'ber', region: 'Europe' },
      { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
      { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
      { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
    ],
    groupBy: (item) => item.region,
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection}>
      <Listbox.Label class={styles.Label}>Select Region</Listbox.Label>
      <Listbox.Content class={styles.Content}>
        <For each={collection.group()}>
          {([region, items]) => (
            <Listbox.ItemGroup class={styles.ItemGroup}>
              <Listbox.ItemGroupLabel class={styles.ItemGroupLabel}>{region}</Listbox.ItemGroupLabel>
              <For each={items}>
                {(item) => (
                  <Listbox.Item class={styles.Item} item={item}>
                    <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
                    <Listbox.ItemIndicator class={styles.ItemIndicator}>
                      <CheckIcon />
                    </Listbox.ItemIndicator>
                  </Listbox.Item>
                )}
              </For>
            </Listbox.ItemGroup>
          )}
        </For>
      </Listbox.Content>
    </Listbox.Root>
  )
}

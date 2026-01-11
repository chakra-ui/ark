import { useListCollection } from '@ark-ui/solid/collection'
import { Listbox } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import field from 'styles/field.module.css'
import styles from 'styles/listbox.module.css'

export const Filtering = () => {
  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Nuxt.js', value: 'nuxtjs' },
      { label: 'Remix', value: 'remix' },
      { label: 'Gatsby', value: 'gatsby' },
      { label: 'Preact', value: 'preact' },
    ],
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection()}>
      <Listbox.Label class={styles.Label}>Select Framework</Listbox.Label>
      <Listbox.Input class={field.Input} placeholder="Search frameworks..." onInput={(e) => filter(e.target.value)} />
      <Listbox.Content class={styles.Content}>
        <Index each={collection().items}>
          {(item) => (
            <Listbox.Item class={styles.Item} item={item()}>
              <Listbox.ItemText class={styles.ItemText}>{item().label}</Listbox.ItemText>
              <Listbox.ItemIndicator class={styles.ItemIndicator}>
                <CheckIcon />
              </Listbox.ItemIndicator>
            </Listbox.Item>
          )}
        </Index>
        <Listbox.Empty class={styles.Empty}>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox.Root>
  )
}

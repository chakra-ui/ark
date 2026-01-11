import { useListCollection } from '@ark-ui/react/collection'
import { Listbox } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
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
    <Listbox.Root className={styles.Root} collection={collection}>
      <Listbox.Label className={styles.Label}>Select Framework</Listbox.Label>
      <Listbox.Input
        className={field.Input}
        placeholder="Search frameworks..."
        onChange={(e) => filter(e.target.value)}
      />
      <Listbox.Content className={styles.Content}>
        {collection.items.map((item) => (
          <Listbox.Item className={styles.Item} key={item.value} item={item}>
            <Listbox.ItemText className={styles.ItemText}>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        ))}
        <Listbox.Empty className={styles.Empty}>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox.Root>
  )
}

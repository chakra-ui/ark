import { Listbox, createListCollection, useListboxContext } from '@ark-ui/react/listbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import styles from 'styles/listbox.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt.js', value: 'nuxtjs' },
    { label: 'Remix', value: 'remix' },
    { label: 'Gatsby', value: 'gatsby' },
  ],
})

const SelectAllHeader = () => {
  const listbox = useListboxContext()
  const isAllSelected = listbox.value.length === frameworks.items.length
  const isSomeSelected = listbox.value.length > 0 && listbox.value.length < frameworks.items.length

  const handleSelectAll = () => {
    if (isAllSelected) {
      listbox.setValue([])
    } else {
      listbox.setValue(frameworks.items.map((item) => item.value))
    }
  }

  return (
    <button className={styles.SelectAllHeader} type="button" onClick={handleSelectAll}>
      <span className={styles.SelectAllHeaderIndicator}>
        {isAllSelected ? <CheckIcon /> : isSomeSelected ? <MinusIcon /> : null}
      </span>
      <span className={styles.Label}>Select All</span>
    </button>
  )
}

export const SelectAll = () => {
  return (
    <Listbox.Root className={styles.Root} collection={frameworks} selectionMode="multiple">
      <SelectAllHeader />
      <Listbox.Content className={styles.Content}>
        {frameworks.items.map((item) => (
          <Listbox.Item className={styles.Item} key={item.value} item={item}>
            <Listbox.ItemText className={styles.ItemText}>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

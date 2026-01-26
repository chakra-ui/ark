import { Listbox, createListCollection, useListboxContext } from '@ark-ui/solid/listbox'
import { CheckIcon, MinusIcon } from 'lucide-solid'
import { Index, Show } from 'solid-js'
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
  const isAllSelected = () => listbox().value.length === frameworks.items.length
  const isSomeSelected = () => listbox().value.length > 0 && listbox().value.length < frameworks.items.length

  const handleSelectAll = () => {
    if (isAllSelected()) {
      listbox().setValue([])
    } else {
      listbox().setValue(frameworks.items.map((item) => item.value))
    }
  }

  return (
    <button class={styles.SelectAllHeader} type="button" onClick={handleSelectAll}>
      <span class={styles.SelectAllHeaderIndicator}>
        <Show when={isAllSelected()}>
          <CheckIcon />
        </Show>
        <Show when={isSomeSelected()}>
          <MinusIcon />
        </Show>
      </span>
      <span class={styles.Label}>Select All</span>
    </button>
  )
}

export const SelectAll = () => {
  return (
    <Listbox.Root class={styles.Root} collection={frameworks} selectionMode="multiple">
      <SelectAllHeader />
      <Listbox.Content class={styles.Content}>
        <Index each={frameworks.items}>
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

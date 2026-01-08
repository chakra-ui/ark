<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { Listbox } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import field from 'styles/field.module.css'
  import styles from 'styles/listbox.module.css'

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
</script>

<Listbox.Root class={styles.Root} collection={collection()}>
  <Listbox.Label class={styles.Label}>Select Framework</Listbox.Label>
  <Listbox.Input
    class={field.Input}
    placeholder="Search frameworks..."
    oninput={(e) => filter(e.currentTarget.value)}
  />
  <Listbox.Content class={styles.Content}>
    {#each collection().items as item (item.value)}
      <Listbox.Item class={styles.Item} {item}>
        <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
        <Listbox.ItemIndicator class={styles.ItemIndicator}>
          <CheckIcon />
        </Listbox.ItemIndicator>
      </Listbox.Item>
    {/each}
    <Listbox.Empty class={styles.Empty}>No frameworks found</Listbox.Empty>
  </Listbox.Content>
</Listbox.Root>

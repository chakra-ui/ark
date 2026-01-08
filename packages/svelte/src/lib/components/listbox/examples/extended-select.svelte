<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import styles from 'styles/listbox.module.css'

  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Preact', value: 'preact' },
    ],
  })
</script>

<Listbox.Root class={styles.Root} {collection} selectionMode="extended">
  <Listbox.Label class={styles.Label}>
    Hold <kbd>⌘</kbd> or <kbd>Ctrl</kbd> to select multiple
  </Listbox.Label>
  <Listbox.Content class={styles.Content}>
    {#each collection.items as item (item.value)}
      <Listbox.Item class={styles.Item} {item}>
        <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
        <Listbox.ItemIndicator class={styles.ItemIndicator}>
          <CheckIcon />
        </Listbox.ItemIndicator>
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.Root>

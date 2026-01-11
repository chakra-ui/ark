<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import styles from 'styles/listbox.module.css'

  const collection = createListCollection({
    items: [
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' },
      { label: 'Sunday', value: 'sun' },
    ],
  })
</script>

<Listbox.Root class={styles.Root} {collection} selectionMode="multiple">
  <Listbox.Label class={styles.Label}>Select Days</Listbox.Label>
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

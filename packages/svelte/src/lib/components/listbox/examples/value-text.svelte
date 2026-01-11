<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import styles from 'styles/listbox.module.css'

  const collection = createListCollection({
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Purple', value: 'purple' },
    ],
  })
</script>

<Listbox.Root
  class={styles.Root}
  {collection}
  selectionMode="multiple"
  defaultValue={['red', 'blue']}
>
  <Listbox.Label class={styles.Label}>
    Colors: <Listbox.ValueText class={styles.ValueText} />
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

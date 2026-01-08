<script lang="ts">
  import { Listbox, createListCollection, useListbox } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import button from 'styles/button.module.css'
  import styles from 'styles/listbox.module.css'

  const collection = createListCollection({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
  })

  const listbox = useListbox({ collection })
</script>

<div class="stack">
  <button class={button.Root} onclick={() => listbox().setValue(['high'])}>
    Set to High
  </button>
  <Listbox.RootProvider class={styles.Root} value={listbox}>
    <Listbox.Label class={styles.Label}>Select Priority</Listbox.Label>
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
  </Listbox.RootProvider>
</div>

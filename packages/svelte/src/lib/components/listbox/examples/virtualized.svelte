<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import CheckIcon from 'lucide-svelte/icons/check'
  import styles from 'styles/listbox.module.css'

  const collection = createListCollection({
    items: Array.from({ length: 10000 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })),
  })

  const virtualizer = useListVirtualizer(() => ({
    count: collection.size,
    estimatedSize: () => 32,
    overscan: 10,
  }))
</script>

<Listbox.Root
  class={styles.Root}
  {collection}
  scrollToIndexFn={(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })}
>
  <Listbox.Label class={styles.Label}>Items</Listbox.Label>
  <Listbox.Content class={styles.Content}>
    <Listbox.List class={styles.Scroller} style={`--total-size: ${virtualizer.getTotalSize()}px`}>
      {#snippet render(props)}
        <ListVirtualizer.Root {...props()} value={virtualizer}>
          <ListVirtualizer.Content>
            {#each virtualizer.getVirtualItems() as virtualItem (virtualItem.key)}
              {@const item = collection.items[virtualItem.index]}
              <Listbox.Item {item} class={styles.Item}>
                {#snippet render(props)}
                  <ListVirtualizer.Item {...props()} item={virtualItem}>
                    <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
                    <Listbox.ItemIndicator class={styles.ItemIndicator}>
                      <CheckIcon />
                    </Listbox.ItemIndicator>
                  </ListVirtualizer.Item>
                {/snippet}
              </Listbox.Item>
            {/each}
          </ListVirtualizer.Content>
        </ListVirtualizer.Root>
      {/snippet}
    </Listbox.List>
  </Listbox.Content>
</Listbox.Root>

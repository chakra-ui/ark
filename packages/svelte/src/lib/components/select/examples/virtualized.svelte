<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import { ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'

  const collection = createListCollection({
    items: Array.from({ length: 5000 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })),
  })

  const virtualizer = useListVirtualizer(() => ({
    count: collection.size,
    estimatedSize: () => 36,
    overscan: 10,
    observeScrollElementSize: true,
  }))
</script>

<Select.Root
  class={styles.Root}
  {collection}
  scrollToIndexFn={(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })}
>
  <Select.Label class={styles.Label}>Item</Select.Label>
  <Select.Control class={styles.Control}>
    <Select.Trigger class={styles.Trigger}>
      <Select.ValueText class={styles.ValueText} placeholder="Select an item" />
    </Select.Trigger>
    <div class={styles.Indicators}>
      <Select.Indicator class={styles.Indicator}>
        <ChevronsUpDownIcon />
      </Select.Indicator>
    </div>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content class={styles.Content}>
        <Select.List class={styles.Scroller} style={`--total-size: ${virtualizer.getTotalSize()}px`}>
          {#snippet render(props)}
            <ListVirtualizer.Root {...props()} value={virtualizer}>
              <ListVirtualizer.Content>
                {#each virtualizer.getVirtualItems() as virtualItem (virtualItem.key)}
                  {@const item = collection.items[virtualItem.index]}
                  <Select.Item {item} class={styles.Item}>
                    {#snippet render(props)}
                      <ListVirtualizer.Item {...props()} item={virtualItem}>
                        <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
                        <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                      </ListVirtualizer.Item>
                    {/snippet}
                  </Select.Item>
                {/each}
              </ListVirtualizer.Content>
            </ListVirtualizer.Root>
          {/snippet}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  </Portal>
</Select.Root>

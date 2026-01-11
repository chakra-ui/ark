<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const initialItems = [
    { label: 'GitHub', href: 'https://github.com', value: 'github' },
    { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stackoverflow' },
    { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
    { label: 'Dev.to', href: 'https://dev.to', value: 'devto' },
    { label: 'Hacker News', href: 'https://news.ycombinator.com', value: 'hackernews' },
    { label: 'Reddit Programming', href: 'https://reddit.com/r/programming', value: 'reddit' },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root class={styles.Root} {collection} onInputValueChange={handleInputChange} selectionBehavior="preserve">
  <Combobox.Label class={styles.Label}>Developer Resources</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. GitHub" />
    <div class={styles.Indicators}>
      <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={styles.Content}>
        {#each collection().items as item (item.value)}
          <Combobox.Item class={styles.Item} {item}>
            {#snippet asChild(props)}
              <a {...props()} href={item.href}>
                <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
              </a>
            {/snippet}
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>

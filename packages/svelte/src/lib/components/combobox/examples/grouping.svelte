<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const initialItems = [
    { label: 'Canada', value: 'ca', continent: 'North America' },
    { label: 'United States', value: 'us', continent: 'North America' },
    { label: 'Mexico', value: 'mx', continent: 'North America' },
    { label: 'Germany', value: 'de', continent: 'Europe' },
    { label: 'France', value: 'fr', continent: 'Europe' },
    { label: 'United Kingdom', value: 'uk', continent: 'Europe' },
    { label: 'Japan', value: 'jp', continent: 'Asia' },
    { label: 'China', value: 'cn', continent: 'Asia' },
    { label: 'India', value: 'in', continent: 'Asia' },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
    groupBy: (item) => item.continent,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root class={styles.Root} {collection} onInputValueChange={handleInputChange}>
  <Combobox.Label class={styles.Label}>Country</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. Canada" />
    <div class={styles.Indicators}>
      <Combobox.ClearTrigger class={styles.ClearTrigger}>Clear</Combobox.ClearTrigger>
      <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={styles.Content}>
        {#each collection().group() as [continent, group]}
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel class={styles.ItemGroupLabel}>{continent}</Combobox.ItemGroupLabel>
            {#each group as item}
              <Combobox.Item class={styles.Item} {item}>
                <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
              </Combobox.Item>
            {/each}
          </Combobox.ItemGroup>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>

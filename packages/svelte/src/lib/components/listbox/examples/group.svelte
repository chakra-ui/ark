<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import styles from 'styles/listbox.module.css'

  const collection = createListCollection({
    items: [
      { label: 'New York', value: 'nyc', region: 'North America' },
      { label: 'Los Angeles', value: 'lax', region: 'North America' },
      { label: 'Toronto', value: 'yyz', region: 'North America' },
      { label: 'London', value: 'lhr', region: 'Europe' },
      { label: 'Paris', value: 'cdg', region: 'Europe' },
      { label: 'Berlin', value: 'ber', region: 'Europe' },
      { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
      { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
      { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
    ],
    groupBy: (item) => item.region,
  })
</script>

<Listbox.Root class={styles.Root} {collection}>
  <Listbox.Label class={styles.Label}>Select Region</Listbox.Label>
  <Listbox.Content class={styles.Content}>
    {#each collection.group() as [region, items]}
      <Listbox.ItemGroup class={styles.ItemGroup}>
        <Listbox.ItemGroupLabel class={styles.ItemGroupLabel}>{region}</Listbox.ItemGroupLabel>
        {#each items as item (item.value)}
          <Listbox.Item class={styles.Item} {item}>
            <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator class={styles.ItemIndicator}>
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        {/each}
      </Listbox.ItemGroup>
    {/each}
  </Listbox.Content>
</Listbox.Root>

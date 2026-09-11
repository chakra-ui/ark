<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import MinusIcon from 'lucide-svelte/icons/minus'
  import styles from 'styles/listbox.module.css'

  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Nuxt.js', value: 'nuxtjs' },
      { label: 'Remix', value: 'remix' },
      { label: 'Gatsby', value: 'gatsby' },
    ],
  })
</script>

<Listbox.Root class={styles.Root} collection={frameworks} selectionMode="multiple">
  <Listbox.Label class={styles.Label}>Frameworks</Listbox.Label>
  <Listbox.Context>
    {#snippet render(listbox)}
      {@const selectedCount = listbox().value.length}
      {@const isAllSelected = selectedCount === frameworks.items.length}
      <button
        class={styles.SelectAllHeader}
        type="button"
        onclick={() => listbox().setValue(isAllSelected ? [] : frameworks.items.map((item) => item.value))}
      >
        <span class={styles.SelectAllHeaderIndicator}>
          {#if isAllSelected}
            <CheckIcon />
          {:else if selectedCount > 0}
            <MinusIcon />
          {/if}
        </span>
        <span class={styles.Label}>Select All</span>
      </button>
    {/snippet}
  </Listbox.Context>
  <Listbox.Content class={styles.Content}>
    <Listbox.List class={styles.List}>
      {#each frameworks.items as item (item.value)}
        <Listbox.Item class={styles.Item} {item}>
          <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
          <Listbox.ItemIndicator class={styles.ItemIndicator}>
            <CheckIcon />
          </Listbox.ItemIndicator>
        </Listbox.Item>
      {/each}
    </Listbox.List>
  </Listbox.Content>
</Listbox.Root>

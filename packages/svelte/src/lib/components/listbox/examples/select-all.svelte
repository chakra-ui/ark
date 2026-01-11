<script lang="ts" module>
  import { createListCollection } from '@ark-ui/svelte/listbox'

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

<script lang="ts">
  import { Listbox, useListboxContext } from '@ark-ui/svelte/listbox'
  import CheckIcon from 'lucide-svelte/icons/check'
  import MinusIcon from 'lucide-svelte/icons/minus'
  import styles from 'styles/listbox.module.css'

  const listbox = useListboxContext()

  const isAllSelected = $derived(listbox().value.length === frameworks.items.length)
  const isSomeSelected = $derived(
    listbox().value.length > 0 && listbox().value.length < frameworks.items.length,
  )

  function handleSelectAll() {
    if (isAllSelected) {
      listbox().setValue([])
    } else {
      listbox().setValue(frameworks.items.map((item) => item.value))
    }
  }
</script>

{#snippet selectAllHeader()}
  <button class={styles.SelectAllHeader} type="button" onclick={handleSelectAll}>
    <span class={styles.SelectAllHeaderIndicator}>
      {#if isAllSelected}
        <CheckIcon />
      {:else if isSomeSelected}
        <MinusIcon />
      {/if}
    </span>
    <span class={styles.Label}>Select All</span>
  </button>
{/snippet}

<Listbox.Root class={styles.Root} collection={frameworks} selectionMode="multiple">
  {@render selectAllHeader()}
  <Listbox.Content class={styles.Content}>
    {#each frameworks.items as item (item.value)}
      <Listbox.Item class={styles.Item} {item}>
        <Listbox.ItemText class={styles.ItemText}>{item.label}</Listbox.ItemText>
        <Listbox.ItemIndicator class={styles.ItemIndicator}>
          <CheckIcon />
        </Listbox.ItemIndicator>
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.Root>

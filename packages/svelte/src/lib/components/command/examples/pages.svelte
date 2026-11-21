<script lang="ts">
  import { Command, createPageListCollection } from '@ark-ui/svelte/command'
  import { ChevronRightIcon, SearchIcon } from 'lucide-svelte'
  import styles from 'styles/command.module.css'

  const collection = createPageListCollection({
    items: [
      { value: 'theme', label: 'Change theme' },
      { value: 'language', label: 'Change language' },
      { value: 'sign-out', label: 'Sign out' },
      { value: 'light', label: 'Light', parent: 'theme' },
      { value: 'dark', label: 'Dark', parent: 'theme' },
      { value: 'system', label: 'System', parent: 'theme' },
      { value: 'english', label: 'English', parent: 'language' },
      { value: 'french', label: 'French', parent: 'language' },
    ],
  })

  let selected = $state<string | null>(null)
</script>

<div class="stack">
  <output>Selected: {selected ?? 'none'}</output>
  <Command.Root class={styles.Root} {collection} onSelect={(details) => (selected = details.itemValue)}>
    <Command.Label class={styles.Label}>Settings</Command.Label>
    <Command.Context>
      {#snippet render(command)}
        <div class={styles.Breadcrumb}>
          <button type="button" onclick={() => command().setPage(null)}>Home</button>
          {#each command().path as page (page.value)}
            <span>
              <ChevronRightIcon />
              <button type="button" onclick={() => command().setPage(page.value)}>{page.label}</button>
            </span>
          {/each}
        </div>
        <Command.Control class={styles.Control}>
          <SearchIcon />
          <Command.Input
            class={styles.Input}
            placeholder={command().page ? 'Search... (Backspace to go back)' : 'Search settings...'}
          />
        </Command.Control>
        <Command.List class={styles.List}>
          {#each command().collection.items as item (item.value)}
            <Command.Item {item} class={styles.Item}>
              <Command.ItemText class={styles.ItemText}>{item.label}</Command.ItemText>
              {#if command().getAncestors(item).length > 0}
                <span class={styles.ItemPath}>
                  {command()
                    .getAncestors(item)
                    .map((page) => page.label)
                    .join(' › ')}
                </span>
              {/if}
              {#if command().isPage(item)}
                <ChevronRightIcon />
              {/if}
            </Command.Item>
          {/each}
        </Command.List>
      {/snippet}
    </Command.Context>
    <Command.Empty class={styles.Empty}>No results found</Command.Empty>
  </Command.Root>
</div>

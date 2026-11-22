<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection'
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import { CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  const people = [
    'Ada Lovelace',
    'Alan Turing',
    'Barbara Liskov',
    'Dennis Ritchie',
    'Grace Hopper',
    'Katherine Johnson',
    'Ken Thompson',
    'Linus Torvalds',
    'Margaret Hamilton',
    'Tim Berners-Lee',
  ]

  let assignee = $state('')

  const list = useAsyncList<string>({
    initialItems: people,
    async load({ filter, signal }) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      if (signal?.aborted) return { items: [] }
      const query = filter?.toLowerCase() ?? ''
      return { items: people.filter((person) => person.toLowerCase().includes(query)) }
    },
  })
</script>

<Menu.Root popupType="dialog" onExitComplete={() => list().setFilter('')}>
  <Menu.Trigger class={styles.Trigger}>
    {assignee || 'Assign'}
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner class={styles.Positioner}>
      <Menu.Content class={styles.Content}>
        <Menu.Input
          class={styles.Input}
          aria-label="Search people"
          placeholder="Search people..."
          value={list().filter ?? ''}
          oninput={(event) => list().setFilter(event.currentTarget.value)}
        />
        {#if list().isLoading}
          <div class={styles.Empty}>Searching...</div>
        {/if}
        {#if !list().isLoading && list().items.length === 0}
          <div class={styles.Empty}>No people found</div>
        {/if}
        <Menu.List class={styles.List}>
          <Menu.RadioItemGroup class={styles.ItemGroup} bind:value={assignee}>
            {#each list().items as person (person)}
              <Menu.RadioItem class={styles.RadioItem} value={person}>
                <Menu.ItemIndicator class={styles.ItemIndicator}>
                  <CheckIcon />
                </Menu.ItemIndicator>
                <Menu.ItemText class={styles.ItemText}>{person}</Menu.ItemText>
              </Menu.RadioItem>
            {/each}
          </Menu.RadioItemGroup>
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>

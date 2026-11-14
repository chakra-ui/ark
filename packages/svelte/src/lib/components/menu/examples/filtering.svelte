<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  const actions = [
    { label: 'New file', value: 'new-file', group: 'File' },
    { label: 'Open file', value: 'open-file', group: 'File' },
    { label: 'Save', value: 'save', group: 'File' },
    { label: 'Save as', value: 'save-as', group: 'File' },
    { label: 'Rename', value: 'rename', group: 'File' },
    { label: 'Duplicate', value: 'duplicate', group: 'Organize' },
    { label: 'Move to trash', value: 'trash', group: 'Organize' },
    { label: 'Download a copy', value: 'download', group: 'Organize' },
    { label: 'Share link', value: 'share', group: 'Share' },
    { label: 'Invite people', value: 'invite', group: 'Share' },
  ]

  const viewItems = [
    { label: 'Show details', value: 'details' },
    { label: 'Show sidebar', value: 'sidebar' },
    { label: 'Keep available offline', value: 'offline' },
  ]

  const { contains } = useFilter({ sensitivity: 'base' })
  let inputRef = $state<HTMLInputElement | null>(null)
  let query = $state('')
  let view = $state<string[]>(['details'])

  const { collection, filter } = useListCollection({
    initialItems: actions,
    filter: (itemText, filterText) => contains(itemText, filterText),
    groupBy: (item) => item.group,
  })

  const viewOptions = $derived(viewItems.filter((item) => contains(item.label, query)))

  const handleQueryChange = (value: string) => {
    query = value
    filter(value)
  }

  const toggleView = (value: string, checked: boolean) => {
    view = checked ? [...view, value] : view.filter((v) => v !== value)
  }
</script>

<Menu.Root composite={false} onExitComplete={() => handleQueryChange('')}>
  <Menu.Trigger class={styles.Trigger}>
    Actions
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <div class={styles.InputControl}>
          <Menu.Input
            bind:ref={inputRef}
            class={styles.Input}
            aria-label="Filter actions"
            placeholder="Search actions..."
            value={query}
            oninput={(event) => handleQueryChange(event.currentTarget.value)}
          />
          {#if query}
            <button
              type="button"
              class={styles.InputClear}
              tabindex={-1}
              aria-hidden="true"
              onclick={() => {
                handleQueryChange('')
                inputRef?.focus()
              }}
            >
              <XIcon />
            </button>
          {/if}
        </div>
        {#if collection().size === 0 && viewOptions.length === 0}
          <div class={styles.Empty}>No actions found</div>
        {/if}
        <Menu.List class={styles.List}>
          {#each collection().group() as [group, items] (group)}
            <Menu.ItemGroup class={styles.ItemGroup}>
              <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
              {#each items as item (item.value)}
                <Menu.Item class={styles.Item} value={item.value}>{item.label}</Menu.Item>
              {/each}
            </Menu.ItemGroup>
          {/each}
          {#if viewOptions.length > 0}
            <Menu.ItemGroup class={styles.ItemGroup}>
              <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>View</Menu.ItemGroupLabel>
              {#each viewOptions as item (item.value)}
                <Menu.CheckboxItem
                  class={styles.CheckboxItem}
                  value={item.value}
                  closeOnSelect={false}
                  checked={view.includes(item.value)}
                  onCheckedChange={(checked) => toggleView(item.value, checked)}
                >
                  <Menu.ItemIndicator class={styles.ItemIndicator}>
                    <CheckIcon />
                  </Menu.ItemIndicator>
                  <Menu.ItemText class={styles.ItemText}>{item.label}</Menu.ItemText>
                </Menu.CheckboxItem>
              {/each}
            </Menu.ItemGroup>
          {/if}
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>

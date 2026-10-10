<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  const fileActions = [
    { label: 'Rename', value: 'rename' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Download a copy', value: 'download' },
    { label: 'Delete', value: 'delete' },
  ]

  const folders = [
    { label: 'Inbox', value: 'inbox' },
    { label: 'Projects', value: 'projects' },
    { label: 'Archive', value: 'archive' },
    { label: 'Design reviews', value: 'design-reviews' },
    { label: 'Personal', value: 'personal' },
    { label: 'Receipts', value: 'receipts' },
  ]

  const sharingOptions = [
    { label: 'Email', value: 'email' },
    { label: 'Message', value: 'message' },
    { label: 'Copy link', value: 'copy-link' },
  ]

  const { contains } = useFilter({ sensitivity: 'base' })
  let query = $state('')
  let folderQuery = $state('')

  const actionList = useListCollection({
    initialItems: fileActions,
    filter: (itemText, filterText) => contains(itemText, filterText),
  })
  const folderList = useListCollection({
    initialItems: folders,
    filter: (itemText, filterText) => contains(itemText, filterText),
  })

  const handleQueryChange = (value: string) => {
    query = value
    actionList.filter(value)
  }

  const handleFolderQueryChange = (value: string) => {
    folderQuery = value
    folderList.filter(value)
  }

  const showMoveTo = $derived(contains('Move to folder', query))
  const showShare = $derived(contains('Share', query))
  const isEmpty = $derived(actionList.collection().size === 0 && !showMoveTo && !showShare)
</script>

<Menu.Root composite={false} onExitComplete={() => handleQueryChange('')}>
  <Menu.Trigger class={styles.Trigger}>
    File
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Input
          class={styles.Input}
          aria-label="Filter actions"
          placeholder="Search actions..."
          value={query}
          oninput={(event) => handleQueryChange(event.currentTarget.value)}
        />
        {#if isEmpty}
          <div class={styles.Empty}>No actions found</div>
        {/if}
        <Menu.List class={styles.List}>
          {#each actionList.collection().items as item (item.value)}
            <Menu.Item class={styles.Item} value={item.value}>{item.label}</Menu.Item>
          {/each}
          {#if showMoveTo}
            <Menu.Root composite={false} onExitComplete={() => handleFolderQueryChange('')}>
              <Menu.TriggerItem class={styles.TriggerItem}>Move to folder</Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content class={styles.Content}>
                    <Menu.Input
                      class={styles.Input}
                      aria-label="Filter folders"
                      placeholder="Search folders..."
                      value={folderQuery}
                      oninput={(event) => handleFolderQueryChange(event.currentTarget.value)}
                    />
                    {#if folderList.collection().size === 0}
                      <div class={styles.Empty}>No folders found</div>
                    {/if}
                    <Menu.List class={styles.List}>
                      {#each folderList.collection().items as item (item.value)}
                        <Menu.Item class={styles.Item} value={item.value}>{item.label}</Menu.Item>
                      {/each}
                    </Menu.List>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          {/if}
          {#if showShare}
            <Menu.Root>
              <Menu.TriggerItem class={styles.TriggerItem}>Share</Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content class={styles.Content}>
                    {#each sharingOptions as option (option.value)}
                      <Menu.Item class={styles.Item} value={option.value}>{option.label}</Menu.Item>
                    {/each}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          {/if}
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>

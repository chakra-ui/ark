<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Menu, type MenuRootProps } from '@ark-ui/svelte/menu'

  let props: MenuRootProps = $props()

  const actions = [
    { label: 'New file', value: 'new-file' },
    { label: 'Save', value: 'save' },
    { label: 'Save as', value: 'save-as' },
    { label: 'Rename', value: 'rename' },
  ]

  const { contains } = useFilter({ sensitivity: 'base' })
  let query = $state('')
  let checked = $state(false)

  const { collection, filter } = useListCollection({
    initialItems: actions,
    filter: (itemText, filterText) => contains(itemText, filterText),
  })

  const handleQueryChange = (value: string) => {
    query = value
    filter(value)
  }
</script>

<Menu.Root composite={false} onOpenChange={(details) => !details.open && handleQueryChange('')} {...props}>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Input
        aria-label="Filter actions"
        value={query}
        oninput={(event) => handleQueryChange(event.currentTarget.value)}
      />
      {#if collection().size === 0}
        <div>No actions found</div>
      {/if}
      <Menu.List>
        {#each collection().items as item (item.value)}
          <Menu.Item value={item.value}>{item.label}</Menu.Item>
        {/each}
        <Menu.CheckboxItem
          value="offline"
          closeOnSelect={false}
          {checked}
          onCheckedChange={(value) => (checked = value)}
        >
          <Menu.ItemText>Keep offline</Menu.ItemText>
        </Menu.CheckboxItem>
      </Menu.List>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>

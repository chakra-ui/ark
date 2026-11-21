<script lang="ts">
  import { Command, createListCollection } from '@ark-ui/svelte/command'

  interface Item {
    label: string
    value: string
    group: string
    disabled?: boolean | undefined
    keywords?: string[] | undefined
    parent?: string | undefined
  }

  const collection = createListCollection<Item>({
    items: [
      { label: 'New file', value: 'new-file', group: 'File' },
      { label: 'Save', value: 'save', group: 'File', keywords: ['write'] },
      { label: 'Print', value: 'print', group: 'File', disabled: true },
      { label: 'Zoom in', value: 'zoom-in', group: 'View' },
      { label: 'Theme', value: 'theme', group: 'View' },
      { label: 'Dark', value: 'dark', group: 'Theme', parent: 'theme' },
      { label: 'Light', value: 'light', group: 'Theme', parent: 'theme' },
    ],
    groupBy: (item) => item.group,
  })

  const props: Partial<Command.RootProps<Item>> = $props()
</script>

<Command.Root {collection} {...props}>
  <Command.Label>Commands</Command.Label>
  <Command.Control>
    <Command.Input placeholder="Search" />
  </Command.Control>
  <Command.Context>
    {#snippet render(command)}
      <Command.List>
        {#each command().collection.group() as [group, items] (group)}
          <Command.ItemGroup>
            <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
            {#each items as item (item.value)}
              <Command.Item {item}>
                <Command.ItemText>{item.label}</Command.ItemText>
              </Command.Item>
            {/each}
          </Command.ItemGroup>
        {/each}
      </Command.List>
    {/snippet}
  </Command.Context>
  <Command.Empty>No results</Command.Empty>
</Command.Root>

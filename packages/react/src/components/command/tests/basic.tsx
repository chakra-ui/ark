import { Command, createPageListCollection } from '@ark-ui/react/command'

interface Item {
  label: string
  value: string
  group: string
  disabled?: boolean | undefined
  keywords?: string[] | undefined
  parent?: string | undefined
}

const collection = createPageListCollection<Item>({
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

export const ComponentUnderTest = (props: Partial<Command.RootProps<Item>>) => (
  <Command.Root collection={collection} {...props}>
    <Command.Label>Commands</Command.Label>
    <Command.Control>
      <Command.Input placeholder="Search" />
    </Command.Control>
    <Command.Context>
      {(command) => (
        <Command.List>
          {command.collection.group().map(([group, items]) => (
            <Command.ItemGroup key={group}>
              <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
              {items.map((item) => (
                <Command.Item key={item.value} item={item}>
                  <Command.ItemText>{item.label}</Command.ItemText>
                </Command.Item>
              ))}
            </Command.ItemGroup>
          ))}
        </Command.List>
      )}
    </Command.Context>
    <Command.Empty>No results</Command.Empty>
  </Command.Root>
)

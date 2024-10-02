import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'

export const Overflow = () => {
  const collection = createListCollection({
    items: [
      'Name 1',
      'Name 2',
      'Name 3',
      'Name 4',
      'Name 5',
      'Name 6',
      'Name 7',
      'Name 8',
      'Name 9',
      'Name 10',
      'Name 11',
      'Name 12',
      'Name 13',
      'Name 14',
    ],
  })

  return (
    <main>
      <h1>Welcome to Ark UI</h1>
      <p>Please edit src/App.tsx and save to reload.</p>
      <Select.Root
        collection={collection}
        positioning={{
          fitViewport: true,
          placement: 'bottom-start',
          sameWidth: true,
        }}
      >
        <Select.Label>Framework</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
          </Select.Trigger>
          <Select.ClearTrigger>Clear</Select.ClearTrigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content style={{ maxHeight: '120px', overflow: 'auto' }}>
              <Select.ItemGroup>
                <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                {collection.items.map((item) => (
                  <Select.Item
                    key={item}
                    item={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Select.ItemContext>
                      {(itemState) => (
                        <Select.ItemText
                          style={{
                            flex: '1',
                            fontSize: '16px',
                            background: itemState.highlighted ? 'blue' : 'white',
                          }}
                        >
                          {item}
                        </Select.ItemText>
                      )}
                    </Select.ItemContext>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
    </main>
  )
}

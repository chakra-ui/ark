import { EnvironmentProvider } from '@ark-ui/solid/environment'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { Index, Portal } from 'solid-js/web'

export const WithShadowRoot = () => {
  let portalNode: (HTMLDivElement & { shadowRoot: ShadowRoot }) | undefined
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  return (
    <Portal ref={portalNode} useShadow={true}>
      <EnvironmentProvider value={() => portalNode?.shadowRoot ?? document}>
        <Select.Root collection={collection}>
          <Select.Label>Framework</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <Select.Indicator>▼</Select.Indicator>
            </Select.Trigger>
            <Select.ClearTrigger>Clear</Select.ClearTrigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <Index each={collection.items}>
                  {(item) => (
                    <Select.Item item={item()}>
                      <Select.ItemText>{item()}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  )}
                </Index>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
          <Select.HiddenSelect />
        </Select.Root>
      </EnvironmentProvider>
    </Portal>
  )
}

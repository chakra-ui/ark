import { Select, createListCollection } from '@ark-ui/solid/select'
import { Index, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

const items = ['React', 'Solid', 'Vue', 'Svelte']

export const MaxSelected = () => {
  const [value, setValue] = createSignal<string[]>([])
  const maxSelected = 2

  const hasReachedMax = (value: string[]) => value.length >= maxSelected

  const collection = createMemo(() =>
    createListCollection({
      items: items.map((item) => ({
        label: item,
        value: item,
        disabled: hasReachedMax(value()) && !value().includes(item),
      })),
    }),
  )

  const handleValueChange = (details: Select.ValueChangeDetails) => {
    if (hasReachedMax(value()) && details.value.length) return
    setValue(details.value)
  }

  return (
    <Select.Root collection={collection()} multiple value={value()} onValueChange={handleValueChange}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>▼</Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
              <Index each={collection().items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item().label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

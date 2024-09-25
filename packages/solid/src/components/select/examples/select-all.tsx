import { ChevronDown } from 'lucide-solid'
import { For, Portal } from 'solid-js/web'
import { Select, createListCollection } from '../..'

const SelectAllButton = () => {
  return (
    <Select.Context>
      {(api) => (
        <button
          type="button"
          onClick={() => {
            api().selectAll()
            api().setOpen(false)
          }}
        >
          Select All
        </button>
      )}
    </Select.Context>
  )
}

export const SelectAll = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  return (
    <Select.Root collection={collection}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>
            <ChevronDown />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <SelectAllButton />
            <For each={collection.items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

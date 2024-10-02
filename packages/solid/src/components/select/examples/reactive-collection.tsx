import { Select, createListCollection } from '@ark-ui/solid/select'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-solid'
import { createMemo, createSignal } from 'solid-js'
import { Index } from 'solid-js/web'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const ReactiveCollection = () => {
  const [number, setNumber] = createSignal(0)

  const collection = createMemo(() =>
    createListCollection({
      items: items.map((item) => ({ ...item, label: `${item.label}-${number()}` })),
    }),
  )

  return (
    <div>
      <button type="button" onClick={() => setNumber(number() + 1)}>
        Inc
      </button>
      <button type="button" onClick={() => setNumber(number() - 1)}>
        Dec
      </button>

      <Select.Root positioning={{ sameWidth: true }} collection={collection()}>
        <Select.Label>Framework</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Framework" />
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Framework</Select.ItemGroupLabel>
              <Index each={collection().items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item().label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </div>
  )
}

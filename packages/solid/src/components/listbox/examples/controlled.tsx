import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { Index, createSignal } from 'solid-js'

export const Controlled = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
  const [value, setValue] = createSignal(['React'])

  return (
    <Listbox.Root value={value()} onValueChange={(e) => setValue(e.value)} collection={collection}>
      <Listbox.Label>Select your Framework</Listbox.Label>
      <Listbox.Content>
        <Index each={collection.items}>
          {(item) => (
            <Listbox.Item item={item()}>
              <Listbox.ItemText>{item()}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </Index>
      </Listbox.Content>
    </Listbox.Root>
  )
}

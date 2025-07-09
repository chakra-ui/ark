import { Select, createListCollection } from '@ark-ui/solid/select'
import { Index, Show, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

function loadData() {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Ember']), 500)
  })
}

export const Async = () => {
  const [items, setItems] = createSignal<string[] | null>(null)
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const collection = createMemo(() =>
    createListCollection<string>({
      items: items() || [],
    }),
  )

  const handleOpenChange = (details: Select.OpenChangeDetails) => {
    if (details.open && items() === null) {
      setLoading(true)
      setError(null)
      loadData()
        .then((data) => setItems(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Select.Root collection={collection()} onOpenChange={handleOpenChange}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select" />
          <Select.Indicator>▼</Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Show when={loading()}>
              <div>Loading...</div>
            </Show>
            <Show when={error()}>
              <div>Error: {error()?.message}</div>
            </Show>
            <Show when={items() !== null && !loading() && !error()}>
              <Index each={collection().items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item()}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Show>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

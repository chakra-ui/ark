import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { Index, Match, Switch, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

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
    <Select.Root class={styles.Root} collection={collection()} onOpenChange={handleOpenChange}>
      <Select.Label class={styles.Label}>Framework</Select.Label>
      <Select.Control class={styles.Control}>
        <Select.Trigger class={styles.Trigger}>
          <Select.ValueText class={styles.ValueText} placeholder="Select" />
          <Select.Indicator class={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content class={styles.Content}>
            <Switch>
              <Match when={loading()}>
                <div class={styles.Item}>Loading...</div>
              </Match>
              <Match when={error()}>
                <div class={styles.Item}>Error: {error()?.message}</div>
              </Match>
              <Match when={items() !== null}>
                <Index each={collection().items}>
                  {(item) => (
                    <Select.Item class={styles.Item} item={item()}>
                      <Select.ItemText class={styles.ItemText}>{item()}</Select.ItemText>
                      <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                    </Select.Item>
                  )}
                </Index>
              </Match>
            </Switch>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

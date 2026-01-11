import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { createMemo, createSignal } from 'solid-js'
import { Index, Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/select.module.css'

export const DynamicItems = () => {
  const [items, setItems] = createSignal(['React', 'Solid', 'Vue', 'Svelte'])
  const collection = createMemo(() =>
    createListCollection({
      items: items(),
    }),
  )

  const addItem = () => setItems([...items(), 'Angular'])

  return (
    <div>
      <Select.Root class={styles.Root} collection={collection()}>
        <Select.Label class={styles.Label}>Framework</Select.Label>
        <Select.Control class={styles.Control}>
          <Select.Trigger class={styles.Trigger}>
            <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
          </Select.Trigger>
          <div class={styles.Indicators}>
            <Select.ClearTrigger class={styles.ClearTrigger}>
              <XIcon />
            </Select.ClearTrigger>
            <Select.Indicator class={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </div>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content class={styles.Content}>
              <Select.ItemGroup class={styles.ItemGroup}>
                <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
                <Index each={collection().items}>
                  {(item) => (
                    <Select.Item class={styles.Item} item={item()}>
                      <Select.ItemText class={styles.ItemText}>{item()}</Select.ItemText>
                      <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                    </Select.Item>
                  )}
                </Index>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>

      <button class={button.Root} style={{ 'margin-top': '1rem' }} type="button" onClick={addItem}>
        Add Item
      </button>
    </div>
  )
}

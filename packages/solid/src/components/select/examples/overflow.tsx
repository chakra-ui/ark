import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { Index, Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

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

export const Overflow = () => (
  <Select.Root
    class={styles.Root}
    collection={collection}
    positioning={{
      fitViewport: true,
      placement: 'bottom-start',
      sameWidth: true,
    }}
  >
    <Select.Label class={styles.Label}>Framework</Select.Label>
    <Select.Control class={styles.Control}>
      <Select.Trigger class={styles.Trigger}>
        <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
        <Select.Indicator class={styles.Indicator}>
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger class={styles.ClearTrigger}>Clear</Select.ClearTrigger>
    </Select.Control>
    <Portal>
      <Select.Positioner>
        <Select.Content class={styles.Content} style={{ 'max-height': '200px' }}>
          <Select.ItemGroup class={styles.ItemGroup}>
            <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Names</Select.ItemGroupLabel>
            <Index each={collection.items}>
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
)

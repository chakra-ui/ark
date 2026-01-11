import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { Index, Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'
import button from 'styles/button.module.css'

const SelectAllButton = () => {
  return (
    <Select.Context>
      {(api) => (
        <button
          class={button.Root}
          style={{ width: '100%', 'margin-bottom': '0.25rem' }}
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
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Select.Root class={styles.Root} collection={collection}>
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
          <Select.Content class={styles.Content}>
            <SelectAllButton />
            <Index each={collection.items}>
              {(item) => (
                <Select.Item class={styles.Item} item={item()}>
                  <Select.ItemText class={styles.ItemText}>{item()}</Select.ItemText>
                  <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                </Select.Item>
              )}
            </Index>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

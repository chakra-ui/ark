import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Index, Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

export const Controlled = () => {
  const [value, setValue] = createSignal<string[]>([])

  const collection = createListCollection<Item>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
  })

  const handleValueChange = (details: Select.ValueChangeDetails<Item>) => {
    setValue(details.value)
  }

  return (
    <Select.Root class={styles.Root} collection={collection} value={value()} onValueChange={handleValueChange}>
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
              <Index each={collection.items}>
                {(item) => (
                  <Select.Item class={styles.Item} item={item()}>
                    <Select.ItemText class={styles.ItemText}>{item().label}</Select.ItemText>
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
}

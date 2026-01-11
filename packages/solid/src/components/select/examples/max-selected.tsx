import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { Index, createMemo, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

const items = ['React', 'Solid', 'Vue', 'Svelte']
const MAX_SELECTION = 2
const hasReachedMax = (value: string[]) => value.length >= MAX_SELECTION

export const MaxSelected = () => {
  const [value, setValue] = createSignal<string[]>([])

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
    if (hasReachedMax(value()) && details.value.length > value().length) return
    setValue(details.value)
  }

  return (
    <Select.Root
      class={styles.Root}
      collection={collection()}
      multiple
      value={value()}
      onValueChange={handleValueChange}
    >
      <Select.Label class={styles.Label}>Framework</Select.Label>
      <Select.Control class={styles.Control}>
        <Select.Trigger class={styles.Trigger}>
          <Select.ValueText class={styles.ValueText} placeholder="Select" />
          <Select.Indicator class={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger class={styles.ClearTrigger}>
          <XIcon />
        </Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content class={styles.Content}>
            <Select.ItemGroup class={styles.ItemGroup}>
              <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
              <Index each={collection().items}>
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

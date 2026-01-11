import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { For, Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react', type: 'JS' },
    { label: 'Solid', value: 'solid', type: 'JS' },
    { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
    { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
  ],
  groupBy: (item) => item.type,
})

export const Grouping = () => {
  return (
    <Select.Root class={styles.Root} collection={frameworks}>
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
            <For each={frameworks.group()}>
              {([type, group]) => (
                <Select.ItemGroup class={styles.ItemGroup}>
                  <Select.ItemGroupLabel class={styles.ItemGroupLabel}>{type}</Select.ItemGroupLabel>
                  <For each={group}>
                    {(item) => (
                      <Select.Item class={styles.Item} item={item}>
                        <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
                        <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                      </Select.Item>
                    )}
                  </For>
                </Select.ItemGroup>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}

import { Select, createListCollection, useSelect } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { Index, Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

export const RootProvider = () => {
  const select = useSelect({ collection: frameworks })

  return (
    <>
      <output>selected: {JSON.stringify(select().value)}</output>

      <Select.RootProvider class={styles.Root} value={select}>
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
                <Index each={frameworks.items}>
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
      </Select.RootProvider>
    </>
  )
}

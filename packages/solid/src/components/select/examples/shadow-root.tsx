import { EnvironmentProvider } from '@ark-ui/solid/environment'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { Index, Portal } from 'solid-js/web'
import styles from 'styles/select.module.css'

export const ShadowRoot = () => {
  let portalNode: (HTMLDivElement & { shadowRoot: ShadowRoot }) | undefined

  const collection = createListCollection({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })

  return (
    <Portal ref={portalNode} useShadow={true}>
      <EnvironmentProvider value={() => portalNode?.shadowRoot ?? document}>
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
          <Select.Positioner>
            <Select.Content class={styles.Content}>
              <Select.ItemGroup class={styles.ItemGroup}>
                <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
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
          <Select.HiddenSelect />
        </Select.Root>
      </EnvironmentProvider>
    </Portal>
  )
}

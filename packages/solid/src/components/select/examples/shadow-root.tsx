import { EnvironmentProvider } from '@ark-ui/solid/environment'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { onSettled } from 'solid-js'
import { For, render } from '@solidjs/web'
import styles from 'styles/select.module.css'

export const ShadowRoot = () => {
  let host!: HTMLDivElement

  const collection = createListCollection({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })

  // Solid 2's Portal has no shadow option, so render into a shadow root we attach ourselves
  onSettled(() => {
    const shadowRoot = host.attachShadow({ mode: 'open' })
    return render(() => <SelectInShadow shadowRoot={shadowRoot} />, shadowRoot)
  })

  const SelectInShadow = (props: { shadowRoot: ShadowRoot }) => (
    <EnvironmentProvider value={() => props.shadowRoot}>
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
            <Select.List class={styles.List}>
              <Select.ItemGroup class={styles.ItemGroup}>
                <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
                <For each={collection.items} keyed={false}>
                  {(item) => (
                    <Select.Item class={styles.Item} item={item()}>
                      <Select.ItemText class={styles.ItemText}>{item()}</Select.ItemText>
                      <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                    </Select.Item>
                  )}
                </For>
              </Select.ItemGroup>
            </Select.List>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
    </EnvironmentProvider>
  )

  return <div ref={host} />
}

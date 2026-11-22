import { Select, createListCollection } from '@ark-ui/solid/select'
import { Tabs } from '@ark-ui/solid/tabs'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-solid'
import { For, createMemo, createSignal } from 'solid-js'
import { Portal } from '@solidjs/web'
import styles from 'styles/select.module.css'
import tabs from 'styles/tabs.module.css'

export const WithTabs = () => {
  const [tab, setTab] = createSignal('branches')
  const [value, setValue] = createSignal(['main'])

  const collection = createMemo(() => createListCollection({ items: refs[tab()] }))

  return (
    <Select.Root
      class={styles.Root}
      collection={collection()}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      <Select.Label class={styles.Label}>Switch branches or tags</Select.Label>
      <Select.Control class={styles.Control}>
        <Select.Trigger class={styles.Trigger}>
          <Select.ValueText class={styles.ValueText}>{value()[0]}</Select.ValueText>
          <Select.Indicator class={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner class={styles.Positioner}>
          <Select.Content class={styles.Content}>
            <Tabs.Root
              class={tabs.Root}
              value={tab()}
              onValueChange={(details) => details.value && setTab(details.value)}
              lazyMount
              unmountOnExit
            >
              <Tabs.List class={tabs.List}>
                <Tabs.Trigger class={tabs.Trigger} value="branches">
                  Branches
                </Tabs.Trigger>
                <Tabs.Trigger class={tabs.Trigger} value="tags">
                  Tags
                </Tabs.Trigger>
              </Tabs.List>
              <For each={Object.keys(refs)}>
                {(key) => (
                  <Tabs.Content value={key} class={tabs.Content}>
                    <Select.List class={styles.List}>
                      <For each={collection().items}>
                        {(item) => (
                          <Select.Item class={styles.Item} item={item}>
                            <Select.ItemText class={styles.ItemText}>{item}</Select.ItemText>
                            <Select.ItemIndicator class={styles.ItemIndicator}>
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        )}
                      </For>
                    </Select.List>
                  </Tabs.Content>
                )}
              </For>
            </Tabs.Root>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const refs: Record<string, string[]> = {
  branches: ['main', 'develop', 'feat/date-input', 'feat/listbox-grid', 'fix/menu-focus'],
  tags: ['v6.0.0', 'v5.36.1', 'v5.36.0', 'v5.35.2', 'v5.35.1'],
}

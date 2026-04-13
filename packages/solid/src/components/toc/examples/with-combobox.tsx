import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { Toc } from '@ark-ui/solid/toc'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import comboboxStyles from 'styles/combobox.module.css'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 1, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

export const WithCombobox = () => {
  const filterFn = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({
    initialItems: items.map(({ label, value }) => ({ label, value })),
    filter: filterFn().contains,
  })

  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        <h2 id="introduction">Introduction</h2>
        <p>{p}</p>
        <h2 id="installation">Installation</h2>
        <p>{p}</p>
        <h2 id="usage">Usage</h2>
        <p>{p}</p>
        <h2 id="api-reference">API Reference</h2>
        <p>{p}</p>
        <h2 id="examples">Examples</h2>
        <p>{p}</p>
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <Combobox.Root
          class={comboboxStyles.Root}
          collection={collection()}
          onInputValueChange={(d) => filter(d.inputValue)}
          onValueChange={(d) => {
            document.getElementById(d.value[0])?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Combobox.Control class={comboboxStyles.Control}>
            <Combobox.Input class={comboboxStyles.Input} placeholder="Search sections..." />
            <div class={comboboxStyles.Indicators}>
              <Combobox.ClearTrigger class={comboboxStyles.ClearTrigger}>
                <XIcon />
              </Combobox.ClearTrigger>
              <Combobox.Trigger class={comboboxStyles.Trigger}>
                <ChevronsUpDownIcon />
              </Combobox.Trigger>
            </div>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content class={comboboxStyles.Content}>
                <For each={collection().items}>
                  {(item) => (
                    <Combobox.Item class={comboboxStyles.Item} item={item}>
                      <Combobox.ItemText class={comboboxStyles.ItemText}>{item.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator class={comboboxStyles.ItemIndicator}>
                        <CheckIcon />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  )}
                </For>
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
        <Toc.List class={styles.List}>
          <For each={items}>
            {(item) => (
              <Toc.Item class={styles.Item} item={item}>
                <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
              </Toc.Item>
            )}
          </For>
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}

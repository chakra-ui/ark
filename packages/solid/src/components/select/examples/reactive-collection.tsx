import { Select, createListCollection } from '@ark-ui/solid/select'
import { CheckIcon, ChevronsUpDownIcon, MinusIcon, PlusIcon } from 'lucide-solid'
import { createMemo, createSignal } from 'solid-js'
import { Index } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/select.module.css'

const itemsBase = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const ReactiveCollection = () => {
  const [number, setNumber] = createSignal(0)
  const collection = createMemo(() =>
    createListCollection({
      items: itemsBase.map((item) => ({ ...item, label: `${item.label}-${number()}` })),
    }),
  )

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', 'margin-bottom': '1rem' }}>
        <button class={button.Root} type="button" onClick={() => setNumber(number() + 1)}>
          <PlusIcon />
        </button>
        <button class={button.Root} type="button" onClick={() => setNumber(number() - 1)}>
          <MinusIcon />
        </button>
      </div>

      <Select.Root class={styles.Root} positioning={{ sameWidth: true }} collection={collection()}>
        <Select.Label class={styles.Label}>Framework</Select.Label>
        <Select.Control class={styles.Control}>
          <Select.Trigger class={styles.Trigger}>
            <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
            <Select.Indicator class={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content class={styles.Content}>
            <Select.ItemGroup class={styles.ItemGroup}>
              <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Framework</Select.ItemGroupLabel>
              <Index each={collection().items}>
                {(item) => (
                  <Select.Item class={styles.Item} item={item()}>
                    <Select.ItemText class={styles.ItemText}>{item().label}</Select.ItemText>
                    <Select.ItemIndicator class={styles.ItemIndicator}>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </div>
  )
}

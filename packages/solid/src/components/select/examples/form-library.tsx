import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { For, Portal } from '@solidjs/web'
import button from 'styles/button.module.css'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
  ],
})

export const FormLibrary = () => {
  const [value, setValue] = createSignal<string | undefined>('solid')

  return (
    <>
      <div style={{ 'margin-bottom': '1rem' }}>Value is {value()}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          window.alert(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))))
        }}
      >
        <Select.Root
          class={styles.Root}
          collection={frameworks}
          value={value() ? [value()!] : []}
          name="value"
          onValueChange={(e) => setValue(e.value[0])}
        >
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
                <Select.List class={styles.List}>
                  <Select.ItemGroup class={styles.ItemGroup}>
                    <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
                    <For each={frameworks.items} keyed={false}>
                      {(item) => (
                        <Select.Item class={styles.Item} item={item()}>
                          <Select.ItemText class={styles.ItemText}>{item().label}</Select.ItemText>
                          <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                        </Select.Item>
                      )}
                    </For>
                  </Select.ItemGroup>
                </Select.List>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>

        <button class={button.Root} style={{ 'margin-top': '1rem' }} type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

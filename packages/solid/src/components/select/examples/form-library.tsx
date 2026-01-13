import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { createForm, getValue, setValue } from '@modular-forms/solid'
import { createMemo } from 'solid-js'
import { Index, Portal } from 'solid-js/web'
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
  const [formStore, { Form, Field }] = createForm({
    initialValues: { value: 'solid' },
  })

  const value = createMemo(() => getValue(formStore, 'value'))

  return (
    <>
      <div style={{ 'margin-bottom': '1rem' }}>Value is {value()}</div>
      <Form
        onSubmit={(data) => {
          window.alert(JSON.stringify(data))
        }}
      >
        <Field name="value">
          {(field, props) => (
            <Select.Root
              class={styles.Root}
              collection={frameworks}
              value={field.value ? [field.value] : []}
              invalid={!!field.error}
              name={field.name}
              onValueChange={(e) => setValue(formStore, field.name, e.value[0])}
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
              <Select.HiddenSelect {...props} />
            </Select.Root>
          )}
        </Field>

        <button class={button.Root} style={{ 'margin-top': '1rem' }} type="submit">
          Submit
        </button>
      </Form>
    </>
  )
}

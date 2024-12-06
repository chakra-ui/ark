import { Select, createListCollection } from '@ark-ui/solid'
import { createForm, getValue, setValue } from '@modular-forms/solid'
import { createMemo } from 'solid-js'
import { Index, Portal } from 'solid-js/web'

export const WithFormLibrary = () => {
  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
    ],
  })

  const [formStore, { Form, Field }] = createForm({
    initialValues: { value: 'solid' },
  })

  const value = createMemo(() => getValue(formStore, 'value'))

  return (
    <>
      <div>Value is {value()}</div>
      <Form
        onSubmit={(e) => {
          console.log(e.value)
        }}
      >
        <Field name="value">
          {(field, props) => (
            <Select.Root
              collection={frameworks}
              value={field.value ? [field.value] : undefined}
              invalid={!!field.error}
              name={field.name}
              onValueChange={(e) => {
                setValue(formStore, field.name, e.value[0])
              }}
            >
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select a Framework" />
                </Select.Trigger>
                <Select.ClearTrigger>Clear</Select.ClearTrigger>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                      <Index each={frameworks.items}>
                        {(item) => (
                          <Select.Item item={item()}>
                            <Select.ItemText>{item().label}</Select.ItemText>
                            <Select.ItemIndicator>✓</Select.ItemIndicator>
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
        <button type="submit">Submit</button>
      </Form>
    </>
  )
}

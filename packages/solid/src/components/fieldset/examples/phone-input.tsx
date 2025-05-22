import { Field } from '@ark-ui/solid/field'
import { Fieldset } from '@ark-ui/solid/fieldset'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { Index, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const PhoneInput = () => {
  const extensions = createListCollection({
    items: ['+1', '+44', '+49', '+41'],
  })

  const [inputRef, setInputRef] = createSignal<HTMLInputElement | null>(null)

  const focusInput = () => {
    setTimeout(() => {
      inputRef()?.focus()
    })
  }

  return (
    <Fieldset.Root style={{ border: '0', padding: '0' }}>
      <Fieldset.Legend onClick={focusInput}>Mobile Number</Fieldset.Legend>

      <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
        <Field.Root>
          <Select.Root collection={extensions} defaultValue={['+1']} onValueChange={focusInput}>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select" />
              </Select.Trigger>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  <Index each={extensions.items}>
                    {(item) => (
                      <Select.Item item={item}>
                        <Select.ItemText>{item()}</Select.ItemText>
                      </Select.Item>
                    )}
                  </Index>
                </Select.Content>
              </Select.Positioner>
            </Portal>
            <Select.HiddenSelect />
          </Select.Root>
        </Field.Root>

        <Field.Root>
          <Field.Input ref={setInputRef} />
        </Field.Root>
      </div>
    </Fieldset.Root>
  )
}

import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'
import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { useRef } from 'react'

export const PhoneInput = () => {
  const extensions = createListCollection({
    items: ['+1', '+44', '+49', '+41'],
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  return (
    <Fieldset.Root style={{ border: '0', padding: '0' }}>
      <Fieldset.Legend onClick={focusInput}>Mobile Number</Fieldset.Legend>

      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
                  {extensions.items.map((item) => (
                    <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
            <Select.HiddenSelect />
          </Select.Root>
        </Field.Root>

        <Field.Root>
          <Field.Input ref={inputRef} />
        </Field.Root>
      </div>
    </Fieldset.Root>
  )
}

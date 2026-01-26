import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'
import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useRef } from 'react'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'
import select from 'styles/select.module.css'

export const PhoneInput = () => {
  const extensions = createListCollection({
    items: [
      { label: '+1', value: '+1' },
      { label: '+44', value: '+44' },
      { label: '+49', value: '+49' },
      { label: '+41', value: '+41' },
    ],
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  return (
    <Fieldset.Root className={styles.Root}>
      <Fieldset.Legend className={styles.Legend} onClick={focusInput}>
        Mobile Number
      </Fieldset.Legend>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        <Field.Root>
          <Select.Root className={select.Root} collection={extensions} defaultValue={['+1']} onValueChange={focusInput}>
            <Select.Control className={select.Control}>
              <Select.Trigger className={select.Trigger}>
                <Select.ValueText placeholder="Select" />
                <ChevronsUpDownIcon />
              </Select.Trigger>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content className={select.Content}>
                  {extensions.items.map((item) => (
                    <Select.Item className={select.Item} key={item.value} item={item}>
                      <Select.ItemText className={select.ItemText}>{item.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
            <Select.HiddenSelect />
          </Select.Root>
        </Field.Root>

        <Field.Root className={field.Root}>
          <Field.Input className={field.Input} ref={inputRef} />
        </Field.Root>
      </div>
    </Fieldset.Root>
  )
}

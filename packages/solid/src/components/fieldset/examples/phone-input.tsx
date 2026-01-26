import { Field } from '@ark-ui/solid/field'
import { Fieldset } from '@ark-ui/solid/fieldset'
import { Select, createListCollection } from '@ark-ui/solid/select'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
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

  const [inputRef, setInputRef] = createSignal<HTMLInputElement | null>(null)

  const focusInput = () => {
    setTimeout(() => {
      inputRef()?.focus()
    })
  }

  return (
    <Fieldset.Root class={styles.Root}>
      <Fieldset.Legend class={styles.Legend} onClick={focusInput}>
        Mobile Number
      </Fieldset.Legend>

      <div style={{ display: 'flex', 'align-items': 'flex-start', gap: '0.5rem' }}>
        <Field.Root>
          <Select.Root class={select.Root} collection={extensions} defaultValue={['+1']} onValueChange={focusInput}>
            <Select.Control class={select.Control}>
              <Select.Trigger class={select.Trigger}>
                <Select.ValueText placeholder="Select" />
                <ChevronsUpDownIcon />
              </Select.Trigger>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content class={select.Content}>
                  <Index each={extensions.items}>
                    {(item) => (
                      <Select.Item class={select.Item} item={item()}>
                        <Select.ItemText class={select.ItemText}>{item().label}</Select.ItemText>
                      </Select.Item>
                    )}
                  </Index>
                </Select.Content>
              </Select.Positioner>
            </Portal>
            <Select.HiddenSelect />
          </Select.Root>
        </Field.Root>

        <Field.Root class={field.Root}>
          <Field.Input class={field.Input} ref={setInputRef} />
        </Field.Root>
      </div>
    </Fieldset.Root>
  )
}

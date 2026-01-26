import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { Field } from '@ark-ui/react/field'
import { useFilter } from '@ark-ui/react/locale'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'
import field from 'styles/field.module.css'

export const WithField = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Field.Root className={field.Root}>
      <Combobox.Root className={styles.Root} collection={collection} onInputValueChange={handleInputChange}>
        <Combobox.Label className={styles.Label}>Department</Combobox.Label>
        <Combobox.Control className={styles.Control}>
          <Combobox.Input className={styles.Input} placeholder="e.g. Engineering" />
          <div className={styles.Indicators}>
            <Combobox.ClearTrigger className={styles.ClearTrigger}>
              <XIcon />
            </Combobox.ClearTrigger>
            <Combobox.Trigger className={styles.Trigger}>
              <ChevronsUpDownIcon />
            </Combobox.Trigger>
          </div>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content className={styles.Content}>
            {collection.items.map((item) => (
              <Combobox.Item className={styles.Item} key={item.value} item={item}>
                <Combobox.ItemText className={styles.ItemText}>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator className={styles.ItemIndicator}>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
      <Field.HelperText className={field.HelperText}>Select your primary department</Field.HelperText>
      <Field.ErrorText className={field.ErrorText}>Department is required</Field.ErrorText>
    </Field.Root>
  )
}

const initialItems = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
]

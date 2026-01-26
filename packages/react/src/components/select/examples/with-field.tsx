import { Field } from '@ark-ui/react/field'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/select.module.css'

export const WithField = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Field.Root className={field.Root}>
      <Select.Root collection={collection} className={styles.Root}>
        <Select.Label className={styles.Label}>Label</Select.Label>
        <Select.Control className={styles.Control}>
          <Select.Trigger className={styles.Trigger}>
            <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
            <Select.Indicator className={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            {collection.items.map((item) => (
              <Select.Item className={styles.Item} key={item} item={item}>
                <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
      <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
      <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
    </Field.Root>
  )
}

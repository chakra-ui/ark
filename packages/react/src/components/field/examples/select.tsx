import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const Select = () => (
  <Field.Root className={styles.Root}>
    <Field.Label className={styles.Label}>Label</Field.Label>
    <Field.Select className={styles.Select}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Field.Select>
    <Field.HelperText className={styles.HelperText}>Some additional Info</Field.HelperText>
    <Field.ErrorText className={styles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const Invalid = () => (
  <Field.Root className={styles.Root} invalid>
    <Field.Label className={styles.Label}>Email</Field.Label>
    <Field.Input className={styles.Input} placeholder="me@example.com" />
    <Field.ErrorText className={styles.ErrorText}>This is an error text</Field.ErrorText>
  </Field.Root>
)

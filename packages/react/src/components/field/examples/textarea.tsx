import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const Textarea = () => (
  <Field.Root className={styles.Root}>
    <Field.Label className={styles.Label}>Label</Field.Label>
    <Field.Textarea className={styles.Textarea} />
    <Field.HelperText className={styles.HelperText}>Some additional Info</Field.HelperText>
    <Field.ErrorText className={styles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

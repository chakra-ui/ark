import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const Disabled = () => (
  <Field.Root className={styles.Root} disabled>
    <Field.Label className={styles.Label}>Label</Field.Label>
    <Field.Input className={styles.Input} />
    <Field.HelperText className={styles.HelperText}>Some additional Info</Field.HelperText>
    <Field.ErrorText className={styles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

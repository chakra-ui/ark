import { Field } from '@ark-ui/solid/field'
import styles from 'styles/field.module.css'

export const TextareaAutoresize = () => (
  <Field.Root class={styles.Root}>
    <Field.Label class={styles.Label}>Label</Field.Label>
    <Field.Textarea class={styles.Textarea} autoresize />
    <Field.HelperText class={styles.HelperText}>Some additional Info</Field.HelperText>
    <Field.ErrorText class={styles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

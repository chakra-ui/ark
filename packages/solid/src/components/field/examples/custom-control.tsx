import { Field } from '@ark-ui/solid/field'
import styles from 'styles/field.module.css'

export const CustomControl = () => (
  <Field.Root class={styles.Root} invalid>
    <Field.Label class={styles.Label}>Any Control</Field.Label>
    <Field.Context>{(field) => <input {...field().getInputProps()} />}</Field.Context>
    <Field.HelperText class={styles.HelperText}>Uses getInputProps() for maximum flexibility</Field.HelperText>
    <Field.ErrorText class={styles.ErrorText}>This field has an error</Field.ErrorText>
  </Field.Root>
)

import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const CustomControl = () => (
  <Field.Root className={styles.Root} invalid>
    <Field.Label className={styles.Label}>Any Control</Field.Label>
    <Field.Context>{(context) => <input {...context.getInputProps()} />}</Field.Context>
    <Field.HelperText className={styles.HelperText}>Uses getInputProps() for maximum flexibility</Field.HelperText>
    <Field.ErrorText className={styles.ErrorText}>This field has an error</Field.ErrorText>
  </Field.Root>
)

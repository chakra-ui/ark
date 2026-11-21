import { Field } from '@ark-ui/solid/field'
import styles from 'styles/field.module.css'

export const Indicator = () => (
  <Field.Root class={styles.Root} required>
    <Field.Label class={styles.Label}>
      Username
      <Field.Indicator type="required">*</Field.Indicator>
    </Field.Label>
    <Field.Input class={styles.Input} />
  </Field.Root>
)

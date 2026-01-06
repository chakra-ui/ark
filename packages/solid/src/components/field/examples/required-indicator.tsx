import { Field } from '@ark-ui/solid/field'
import styles from 'styles/field.module.css'

export const RequiredIndicator = () => (
  <Field.Root class={styles.Root} required>
    <Field.Label class={styles.Label}>
      Username
      <Field.RequiredIndicator />
    </Field.Label>
    <Field.Input class={styles.Input} />
  </Field.Root>
)

import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const RequiredIndicator = () => (
  <Field.Root className={styles.Root} required>
    <Field.Label className={styles.Label}>
      Username
      <Field.RequiredIndicator />
    </Field.Label>
    <Field.Input className={styles.Input} />
  </Field.Root>
)

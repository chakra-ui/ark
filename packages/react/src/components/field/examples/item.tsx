import { Field } from '@ark-ui/react/field'
import styles from 'styles/field.module.css'

export const Item = () => (
  <Field.Root className={styles.Root} target="amount">
    <Field.Label className={styles.Label}>Amount</Field.Label>
    <Field.Item value="currency">
      <Field.Select className={styles.Select}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </Field.Select>
    </Field.Item>
    <Field.Item value="amount">
      <Field.Input className={styles.Input} />
    </Field.Item>
    <Field.HelperText className={styles.HelperText}>Enter the amount</Field.HelperText>
    <Field.ErrorText className={styles.ErrorText}>Invalid amount</Field.ErrorText>
  </Field.Root>
)

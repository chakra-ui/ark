import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const RTL = () => (
  <DateInput.Root className={styles.Root} dir="rtl" locale="ar-SA">
    <DateInput.Label className={styles.Label}>التاريخ</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.Input className={styles.Input} />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

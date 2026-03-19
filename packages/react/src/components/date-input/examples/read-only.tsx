import { DateInput, parseDate } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const ReadOnly = () => (
  <DateInput.Root className={styles.Root} readOnly defaultValue={[parseDate('2024-06-15')]}>
    <DateInput.Label className={styles.Label}>Date</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.Input className={styles.Input} />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

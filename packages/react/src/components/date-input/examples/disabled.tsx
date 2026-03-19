import { DateInput, parseDate } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const Disabled = () => (
  <DateInput.Root className={styles.Root} disabled defaultValue={[parseDate('2024-06-15')]}>
    <DateInput.Label className={styles.Label}>Date</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.Input className={styles.Input} />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

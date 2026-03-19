import { DateInput, parseDate } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const MinMax = () => (
  <DateInput.Root className={styles.Root} min={parseDate('2024-01-01')} max={parseDate('2024-12-31')}>
    <DateInput.Label className={styles.Label}>Date (2024 only)</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.Input className={styles.Input} />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

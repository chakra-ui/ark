import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const Basic = () => (
  <DateInput.Root className={styles.Root}>
    <DateInput.Label className={styles.Label}>Date</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.Input className={styles.Input} />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

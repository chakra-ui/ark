import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const RootProvider = () => {
  const dateInput = useDateInput()

  return (
    <div className="stack">
      <DateInput.RootProvider className={styles.Root} value={dateInput}>
        <DateInput.Label className={styles.Label}>Date</DateInput.Label>
        <DateInput.Control className={styles.Control}>
          <DateInput.Input className={styles.Input} />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.RootProvider>
    </div>
  )
}

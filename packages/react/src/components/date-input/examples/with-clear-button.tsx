import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import button from 'styles/button.module.css'
import styles from 'styles/date-input.module.css'

export const WithClearButton = () => {
  const dateInput = useDateInput()

  return (
    <DateInput.RootProvider className={styles.Root} value={dateInput}>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.Input className={styles.Input} />
        <button className={button.Root} type="button" onClick={() => dateInput.clearValue()}>
          Clear
        </button>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}

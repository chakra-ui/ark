import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const RootProvider = () => {
  const dateInput = useDateInput()

  return (
    <DateInput.RootProvider className={styles.Root} value={dateInput}>
      <output>{dateInput.valueAsString.length > 0 ? dateInput.valueAsString : 'N/A'}</output>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.SegmentGroup className={styles.SegmentGroup}>
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment className={styles.Segment} segment={segment} />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}

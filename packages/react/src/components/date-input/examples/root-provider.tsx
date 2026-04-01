import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const RootProvider = () => {
  const dateInput = useDateInput()

  return (
    <div className="stack">
      <DateInput.RootProvider className={styles.Root} value={dateInput}>
        <DateInput.Label className={styles.Label}>Date</DateInput.Label>
        <DateInput.Control className={styles.Control}>
          <DateInput.SegmentGroup className={styles.SegmentGroup}>
            <DateInput.Context>
              {(dateInput) =>
                dateInput
                  .getSegments()
                  .map((segment, index) => (
                    <DateInput.Segment className={styles.Segment} key={`${segment.type}-${index}`} segment={segment} />
                  ))
              }
            </DateInput.Context>
          </DateInput.SegmentGroup>
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.RootProvider>
    </div>
  )
}

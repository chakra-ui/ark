import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/date-input.module.css'

export const WithClearButton = () => {
  const dateInput = useDateInput()

  return (
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
        <button aria-label="Clear date" className={button.Root} type="button" onClick={() => dateInput.clearValue()}>
          <XIcon />
        </button>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}

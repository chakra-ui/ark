import { DateInput, useDateInput } from '@ark-ui/react/date-input'
import type { DateSegment } from '@zag-js/date-input'
import button from 'styles/button.module.css'
import styles from 'styles/date-input.module.css'

export const WithClearButton = () => {
  const dateInput = useDateInput()

  return (
    <DateInput.RootProvider className={styles.Root} value={dateInput}>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.SegmentGroup className={styles.Input}>
          <DateInput.Context>
            {(dateInput) =>
              dateInput
                .getSegments()
                .map((segment: DateSegment, index: number) => (
                  <DateInput.Segment key={`${segment.type}-${index}`} segment={segment} />
                ))
            }
          </DateInput.Context>
        </DateInput.SegmentGroup>
        <button className={button.Root} type="button" onClick={() => dateInput.clearValue()}>
          Clear
        </button>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}

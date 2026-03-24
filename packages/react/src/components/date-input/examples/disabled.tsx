import { DateInput, parseDate } from '@ark-ui/react/date-input'
import type { DateSegment } from '@zag-js/date-input'
import styles from 'styles/date-input.module.css'

export const Disabled = () => (
  <DateInput.Root className={styles.Root} disabled defaultValue={[parseDate('2024-06-15')]}>
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
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

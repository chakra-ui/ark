import { DateInput } from '@ark-ui/react/date-input'
import { parseDate } from '@internationalized/date'
import styles from 'styles/date-input.module.css'

export const MinMax = () => (
  <DateInput.Root className={styles.Root} min={parseDate('2024-01-01')} max={parseDate('2024-12-31')}>
    <DateInput.Label className={styles.Label}>Date (2024 only)</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.SegmentGroup className={styles.Input}>
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
  </DateInput.Root>
)

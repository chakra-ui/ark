import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const Granularity = () => (
  <DateInput.Root className={styles.Root} granularity="second">
    <DateInput.Label className={styles.Label}>Date & Time</DateInput.Label>
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
  </DateInput.Root>
)

import { DateInput, parseDate } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const DefaultValue = () => (
  <DateInput.Root className={styles.Root} defaultValue={[parseDate('2024-06-15')]}>
    <DateInput.Label className={styles.Label}>Date</DateInput.Label>
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

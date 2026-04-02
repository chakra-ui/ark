import { DateInput } from '@ark-ui/react/date-input'
import { parseDate } from '@internationalized/date'
import styles from 'styles/date-input.module.css'

export const ReadOnly = () => (
  <DateInput.Root className={styles.Root} readOnly defaultValue={[parseDate('2024-06-15')]}>
    <DateInput.Label className={styles.Label}>Date</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.SegmentGroup className={styles.SegmentGroup}>
        <DateInput.SegmentContext>
          {(segment) => <DateInput.Segment className={styles.Segment} segment={segment} />}
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

import { DateInput } from '@ark-ui/react/date-input'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import styles from 'styles/date-input.module.css'

const timeFormatter = new DateFormatter('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export const TimeOnly = () => (
  <DateInput.Root
    className={styles.Root}
    granularity="minute"
    hourCycle={24}
    formatter={timeFormatter}
    timeZone={getLocalTimeZone()}
  >
    <DateInput.Label className={styles.Label}>Time</DateInput.Label>
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

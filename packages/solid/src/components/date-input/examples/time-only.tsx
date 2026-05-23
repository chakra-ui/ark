import { DateInput } from '@ark-ui/solid/date-input'
import { DateFormatter } from '@internationalized/date'
import styles from 'styles/date-input.module.css'

const timeFormatter = new DateFormatter('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export const TimeOnly = () => (
  <DateInput.Root class={styles.Root} granularity="minute" hourCycle={24} formatter={timeFormatter}>
    <DateInput.Label class={styles.Label}>Time</DateInput.Label>
    <DateInput.Control class={styles.Control}>
      <DateInput.SegmentGroup class={styles.SegmentGroup}>
        <DateInput.SegmentContext>
          {(segment) => <DateInput.Segment class={styles.Segment} segment={segment} />}
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

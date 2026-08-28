import { DateInput } from '@ark-ui/solid/date-input'
import styles from 'styles/date-input.module.css'

export const Granularity = () => (
  <DateInput.Root class={styles.Root} granularity="second">
    <DateInput.Label class={styles.Label}>Date & Time</DateInput.Label>
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

import { DateInput } from '@ark-ui/solid/date-input'
import styles from 'styles/date-input.module.css'

export const Basic = () => (
  <DateInput.Root class={styles.Root}>
    <DateInput.Label class={styles.Label}>Date</DateInput.Label>
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

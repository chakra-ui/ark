import { DateInput } from '@ark-ui/solid/date-input'
import { parseDate } from '@internationalized/date'
import styles from 'styles/date-input.module.css'

export const DefaultValue = () => (
  <DateInput.Root class={styles.Root} defaultValue={[parseDate('2024-06-15')]}>
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

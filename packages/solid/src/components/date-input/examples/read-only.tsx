import { DateInput } from '@ark-ui/solid/date-input'
import { parseDate } from '@internationalized/date'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const ReadOnly = () => (
  <DateInput.Root class={styles.Root} readOnly defaultValue={[parseDate('2024-06-15')]}>
    <DateInput.Label class={styles.Label}>Date</DateInput.Label>
    <DateInput.Control class={styles.Control}>
      <DateInput.SegmentGroup class={styles.SegmentGroup}>
        <DateInput.Context>
          {(dateInput) => (
            <Index each={dateInput().getSegments()}>
              {(segment) => <DateInput.Segment class={styles.Segment} segment={segment()} />}
            </Index>
          )}
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

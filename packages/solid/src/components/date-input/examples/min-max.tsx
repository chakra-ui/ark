import { DateInput } from '@ark-ui/solid/date-input'
import { parseDate } from '@internationalized/date'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const MinMax = () => (
  <DateInput.Root class={styles.Root} min={parseDate('2024-01-01')} max={parseDate('2024-12-31')}>
    <DateInput.Label class={styles.Label}>Date (2024 only)</DateInput.Label>
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

import { DateInput } from '@ark-ui/solid/date-input'
import { parseDate, type DateValue } from '@internationalized/date'
import { createSignal } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal<DateValue[]>([parseDate('2024-06-15')])

  return (
    <DateInput.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
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
}

import { DateInput } from '@ark-ui/solid/date-input'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const Granularity = () => (
  <DateInput.Root class={styles.Root} granularity="second">
    <DateInput.Label class={styles.Label}>Date & Time</DateInput.Label>
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

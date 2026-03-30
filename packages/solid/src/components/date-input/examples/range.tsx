import { DateInput } from '@ark-ui/solid/date-input'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const Range = () => (
  <DateInput.Root class={styles.Root} selectionMode="range">
    <DateInput.Label class={styles.Label}>Date Range</DateInput.Label>
    <DateInput.Control class={styles.Control}>
      <DateInput.SegmentGroup index={0} class={styles.Input}>
        <DateInput.Context>
          {(dateInput) => (
            <Index each={dateInput().getSegments()}>{(segment) => <DateInput.Segment segment={segment()} />}</Index>
          )}
        </DateInput.Context>
      </DateInput.SegmentGroup>
      <span>→</span>
      <DateInput.SegmentGroup index={1} class={styles.Input}>
        <DateInput.Context>
          {(dateInput) => (
            <Index each={dateInput().getSegments()}>{(segment) => <DateInput.Segment segment={segment()} />}</Index>
          )}
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput index={0} />
    <DateInput.HiddenInput index={1} />
  </DateInput.Root>
)

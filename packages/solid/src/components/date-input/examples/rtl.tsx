import { DateInput } from '@ark-ui/solid/date-input'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const RTL = () => (
  <DateInput.Root class={styles.Root} dir="rtl" locale="ar-SA">
    <DateInput.Label class={styles.Label}>التاريخ</DateInput.Label>
    <DateInput.Control class={styles.Control}>
      <DateInput.SegmentGroup class={styles.Input}>
        <DateInput.Context>
          {(dateInput) => (
            <Index each={dateInput().getSegments()}>{(segment) => <DateInput.Segment segment={segment()} />}</Index>
          )}
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

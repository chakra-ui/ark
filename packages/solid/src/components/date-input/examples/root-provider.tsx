import { DateInput, useDateInput } from '@ark-ui/solid/date-input'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const RootProvider = () => {
  const dateInput = useDateInput()

  return (
    <div class="stack">
      <DateInput.RootProvider class={styles.Root} value={dateInput}>
        <DateInput.Label class={styles.Label}>Date</DateInput.Label>
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
      </DateInput.RootProvider>
    </div>
  )
}

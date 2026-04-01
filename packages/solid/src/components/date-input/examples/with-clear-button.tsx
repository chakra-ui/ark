import { DateInput, useDateInput } from '@ark-ui/solid/date-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/date-input.module.css'

export const WithClearButton = () => {
  const dateInput = useDateInput()

  return (
    <DateInput.RootProvider class={styles.Root} value={dateInput}>
      <DateInput.Label class={styles.Label}>Date</DateInput.Label>
      <DateInput.Control class={styles.Control}>
        <DateInput.SegmentGroup class={styles.Input}>
          <DateInput.Context>
            {(dateInput) => (
              <Index each={dateInput().getSegments()}>
                {(segment) => <DateInput.Segment class={styles.Segment} segment={segment()} />}
              </Index>
            )}
          </DateInput.Context>
        </DateInput.SegmentGroup>
        <button aria-label="Clear date" class={button.Root} type="button" onClick={() => dateInput().clearValue()}>
          <XIcon />
        </button>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.RootProvider>
  )
}

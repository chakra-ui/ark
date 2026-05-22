import { DateInput } from '@ark-ui/solid/date-input'
import { parseZonedDateTime } from '@internationalized/date'
import { createSignal } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const TimeZone = () => {
  const [hideTimeZone, setHideTimeZone] = createSignal(false)

  return (
    <div class="stack">
      <label class={styles.CheckboxLabel}>
        <input
          class={styles.Checkbox}
          checked={hideTimeZone()}
          onChange={(event) => setHideTimeZone(event.currentTarget.checked)}
          type="checkbox"
        />
        Hide time zone
      </label>
      <DateInput.Root
        class={styles.Root}
        defaultValue={[parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')]}
        granularity="minute"
        hideTimeZone={hideTimeZone()}
      >
        <DateInput.Label class={styles.Label}>Meeting time</DateInput.Label>
        <DateInput.Control class={styles.Control}>
          <DateInput.SegmentGroup class={styles.SegmentGroup}>
            <DateInput.SegmentContext>
              {(segment) => <DateInput.Segment class={styles.Segment} segment={segment} />}
            </DateInput.SegmentContext>
          </DateInput.SegmentGroup>
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </div>
  )
}

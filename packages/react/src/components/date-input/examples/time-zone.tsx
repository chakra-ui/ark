import { DateInput } from '@ark-ui/react/date-input'
import { parseZonedDateTime } from '@internationalized/date'
import { useState } from 'react'
import styles from 'styles/date-input.module.css'

export const TimeZone = () => {
  const [hideTimeZone, setHideTimeZone] = useState(false)

  return (
    <div className="stack">
      <label className={styles.CheckboxLabel}>
        <input
          className={styles.Checkbox}
          checked={hideTimeZone}
          onChange={(event) => setHideTimeZone(event.target.checked)}
          type="checkbox"
        />
        Hide time zone
      </label>
      <DateInput.Root
        className={styles.Root}
        defaultValue={[parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')]}
        granularity="minute"
        hideTimeZone={hideTimeZone}
      >
        <DateInput.Label className={styles.Label}>Meeting time</DateInput.Label>
        <DateInput.Control className={styles.Control}>
          <DateInput.SegmentGroup className={styles.SegmentGroup}>
            <DateInput.SegmentContext>
              {(segment) => <DateInput.Segment className={styles.Segment} segment={segment} />}
            </DateInput.SegmentContext>
          </DateInput.SegmentGroup>
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </div>
  )
}

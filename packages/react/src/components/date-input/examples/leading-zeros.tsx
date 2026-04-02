import { DateInput } from '@ark-ui/react/date-input'
import { parseDate } from '@internationalized/date'
import { useState } from 'react'
import styles from 'styles/date-input.module.css'

export const LeadingZeros = () => {
  const [shouldForceLeadingZeros, setShouldForceLeadingZeros] = useState(true)

  return (
    <div className="stack">
      <label className={styles.CheckboxLabel}>
        <input
          className={styles.Checkbox}
          checked={shouldForceLeadingZeros}
          onChange={(event) => setShouldForceLeadingZeros(event.target.checked)}
          type="checkbox"
        />
        Force leading zeros
      </label>
      <DateInput.Root
        className={styles.Root}
        defaultValue={[parseDate('2024-06-05')]}
        shouldForceLeadingZeros={shouldForceLeadingZeros}
      >
        <DateInput.Label className={styles.Label}>Date</DateInput.Label>
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

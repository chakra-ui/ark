import { DateInput, type ValueChangeDetails } from '@ark-ui/react/date-input'
import type { DateValue } from '@internationalized/date'
import { useState } from 'react'
import styles from 'styles/date-input.module.css'

export const ControlledRange = () => {
  const [value, setValue] = useState<DateValue[]>([])
  const [start, end] = value

  return (
    <>
      <DateInput.Root
        className={styles.Root}
        selectionMode="range"
        value={value}
        onValueChange={(details: ValueChangeDetails) => setValue(details.value)}
      >
        <DateInput.Label className={styles.Label}>Trip Dates</DateInput.Label>
        <DateInput.Control className={styles.Control}>
          <DateInput.SegmentGroup index={0} className={styles.SegmentGroup}>
            <DateInput.Input className={styles.Input} />
            <DateInput.HiddenInput />
          </DateInput.SegmentGroup>
          <span>→</span>
          <DateInput.SegmentGroup index={1} className={styles.SegmentGroup}>
            <DateInput.Input className={styles.Input} />
            <DateInput.HiddenInput />
          </DateInput.SegmentGroup>
        </DateInput.Control>
      </DateInput.Root>
      {start && end && (
        <p style={{ marginTop: '1rem' }}>
          Selected: {start.toString()} → {end.toString()}
          <br />
          Departure Date: {start.toString()}
          <br />
          Return Date: {end.toString()}
        </p>
      )}
    </>
  )
}

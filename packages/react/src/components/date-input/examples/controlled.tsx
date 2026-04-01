import { DateInput } from '@ark-ui/react/date-input'
import { parseDate, type DateValue } from '@internationalized/date'
import { useState } from 'react'
import styles from 'styles/date-input.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<DateValue[]>([parseDate('2024-06-15')])

  return (
    <DateInput.Root className={styles.Root} value={value} onValueChange={(details) => setValue(details.value)}>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.SegmentGroup className={styles.SegmentGroup}>
          <DateInput.Context>
            {(dateInput) =>
              dateInput
                .getSegments()
                .map((segment, index) => (
                  <DateInput.Segment className={styles.Segment} key={`${segment.type}-${index}`} segment={segment} />
                ))
            }
          </DateInput.Context>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}

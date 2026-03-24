// controlled.tsx
import { DateInput, parseDate } from '@ark-ui/react/date-input'
import type { DateValue } from '@internationalized/date'
import type { DateSegment } from '@zag-js/date-input'
import { useState } from 'react'
import styles from 'styles/date-input.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<DateValue[]>([parseDate('2024-06-15')])

  return (
    <DateInput.Root className={styles.Root} value={value} onValueChange={(details) => setValue(details.value)}>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.SegmentGroup className={styles.Input}>
          <DateInput.Context>
            {(dateInput) =>
              dateInput
                .getSegments()
                .map((segment: DateSegment, index: number) => (
                  <DateInput.Segment key={`${segment.type}-${index}`} segment={segment} />
                ))
            }
          </DateInput.Context>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}

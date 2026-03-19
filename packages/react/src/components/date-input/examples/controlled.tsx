import { DateInput, parseDate } from '@ark-ui/react/date-input'
import type { DateValue } from '@internationalized/date'
import { useState } from 'react'
import styles from 'styles/date-input.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<DateValue[]>([parseDate('2024-06-15')])

  return (
    <DateInput.Root className={styles.Root} value={value} onValueChange={(details) => setValue(details.value)}>
      <DateInput.Label className={styles.Label}>Date</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.Input className={styles.Input} />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}

import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const Range = () => (
  <DateInput.Root className={styles.Root} selectionMode="range">
    <DateInput.Label className={styles.Label}>Date Range</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.SegmentGroup index={0} className={styles.SegmentGroup}>
        <DateInput.Input className={styles.Input} index={0} />
      </DateInput.SegmentGroup>
      <span>→</span>
      <DateInput.SegmentGroup index={1} className={styles.SegmentGroup}>
        <DateInput.Input className={styles.Input} index={1} />
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput index={0} />
    <DateInput.HiddenInput index={1} />
  </DateInput.Root>
)

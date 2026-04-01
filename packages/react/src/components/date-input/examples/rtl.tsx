import { DateInput } from '@ark-ui/react/date-input'
import { LocaleProvider } from '@ark-ui/react/locale'
import styles from 'styles/date-input.module.css'

export const RTL = () => (
  <LocaleProvider locale="ar-SA">
    <DateInput.Root className={styles.Root} dir="rtl">
      <DateInput.Label className={styles.Label}>التاريخ</DateInput.Label>
      <DateInput.Control className={styles.Control}>
        <DateInput.SegmentGroup className={styles.Input}>
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
  </LocaleProvider>
)

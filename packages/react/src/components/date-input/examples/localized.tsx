import { DateInput } from '@ark-ui/react/date-input'
import { LocaleProvider } from '@ark-ui/react/locale'
import styles from 'styles/date-input.module.css'

export const Localized = () => (
  <LocaleProvider locale="fr-FR">
    <DateInput.Root className={styles.Root} granularity="minute" hourCycle={24}>
      <DateInput.Label className={styles.Label}>Date et heure</DateInput.Label>
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

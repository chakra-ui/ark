import { DateInput } from '@ark-ui/solid/date-input'
import { LocaleProvider } from '@ark-ui/solid/locale'
import styles from 'styles/date-input.module.css'

export const Localized = () => (
  <LocaleProvider locale="fr-FR">
    <DateInput.Root class={styles.Root} granularity="minute" hourCycle={24}>
      <DateInput.Label class={styles.Label}>Date et heure</DateInput.Label>
      <DateInput.Control class={styles.Control}>
        <DateInput.SegmentGroup class={styles.SegmentGroup}>
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment class={styles.Segment} segment={segment} />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  </LocaleProvider>
)

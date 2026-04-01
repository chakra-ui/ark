import { DateInput } from '@ark-ui/solid/date-input'
import { LocaleProvider } from '@ark-ui/solid/locale'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const Localized = () => (
  <LocaleProvider locale="fr-FR">
    <DateInput.Root class={styles.Root} granularity="minute" hourCycle={24}>
      <DateInput.Label class={styles.Label}>Date et heure</DateInput.Label>
      <DateInput.Control class={styles.Control}>
        <DateInput.SegmentGroup class={styles.Input}>
          <DateInput.Context>
            {(dateInput) => (
              <Index each={dateInput().getSegments()}>
                {(segment) => <DateInput.Segment class={styles.Segment} segment={segment()} />}
              </Index>
            )}
          </DateInput.Context>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  </LocaleProvider>
)

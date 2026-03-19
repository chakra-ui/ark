import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const Localized = () => (
  <DateInput.Root className={styles.Root} locale="fr-FR" granularity="minute" hourCycle={24}>
    <DateInput.Label className={styles.Label}>Date et heure</DateInput.Label>
    <DateInput.Control className={styles.Control}>
      <DateInput.Input className={styles.Input} />
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

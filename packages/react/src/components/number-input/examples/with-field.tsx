import { Field } from '@ark-ui/react/field'
import { NumberInput } from '@ark-ui/react/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/number-input.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <NumberInput.Root className={styles.Root}>
      <NumberInput.Label className={styles.Label}>Label</NumberInput.Label>
      <NumberInput.Control className={styles.Control}>
        <NumberInput.Input className={styles.Input} />
        <div className={styles.TriggerGroup}>
          <NumberInput.IncrementTrigger className={styles.IncrementTrigger}>
            <ChevronUpIcon />
          </NumberInput.IncrementTrigger>
          <NumberInput.DecrementTrigger className={styles.DecrementTrigger}>
            <ChevronDownIcon />
          </NumberInput.DecrementTrigger>
        </div>
      </NumberInput.Control>
    </NumberInput.Root>
    <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

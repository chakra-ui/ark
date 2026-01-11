import { Field } from '@ark-ui/react/field'
import { PinInput } from '@ark-ui/react/pin-input'
import fieldStyles from 'styles/field.module.css'
import styles from 'styles/pin-input.module.css'

export const WithField = () => (
  <Field.Root className={fieldStyles.Root}>
    <PinInput.Root className={styles.Root}>
      <PinInput.Label className={styles.Label}>Label</PinInput.Label>
      <PinInput.Control className={styles.Control}>
        {[0, 1, 2].map((id, index) => (
          <PinInput.Input key={id} index={index} className={styles.Input} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText className={fieldStyles.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={fieldStyles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

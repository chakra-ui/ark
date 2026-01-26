import { Field } from '@ark-ui/react/field'
import { Switch } from '@ark-ui/react/switch'
import field from 'styles/field.module.css'
import styles from 'styles/switch.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <Switch.Root className={styles.Root}>
      <Switch.Control className={styles.Control}>
        <Switch.Thumb className={styles.Thumb} />
      </Switch.Control>
      <Switch.Label className={styles.Label}>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

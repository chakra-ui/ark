import { Checkbox } from '@ark-ui/react/checkbox'
import { Field } from '@ark-ui/react/field'
import { CheckIcon, MinusIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'
import field from 'styles/field.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <Checkbox.Root className={styles.Root}>
      <Checkbox.Control className={styles.Control}>
        <Checkbox.Indicator className={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator className={styles.Indicator} indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className={styles.Label}>Label</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

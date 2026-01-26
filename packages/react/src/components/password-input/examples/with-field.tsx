import { Field } from '@ark-ui/react/field'
import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/password-input.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <PasswordInput.Root className={styles.Root}>
      <PasswordInput.Label className={styles.Label}>Password</PasswordInput.Label>
      <PasswordInput.Control className={styles.Control}>
        <PasswordInput.Input className={styles.Input} />
        <PasswordInput.VisibilityTrigger className={styles.VisibilityTrigger}>
          <PasswordInput.Indicator className={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
    <Field.HelperText className={field.HelperText}>Enter your password</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Password is required</Field.ErrorText>
  </Field.Root>
)

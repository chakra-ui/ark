import { Field } from '@ark-ui/solid/field'
import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import field from 'styles/field.module.css'
import styles from 'styles/password-input.module.css'

export const WithField = () => (
  <Field.Root class={field.Root}>
    <PasswordInput.Root class={styles.Root}>
      <PasswordInput.Label class={styles.Label}>Password</PasswordInput.Label>
      <PasswordInput.Control class={styles.Control}>
        <PasswordInput.Input class={styles.Input} />
        <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
          <PasswordInput.Indicator class={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
    <Field.HelperText class={field.HelperText}>Enter your password</Field.HelperText>
    <Field.ErrorText class={field.ErrorText}>Password is required</Field.ErrorText>
  </Field.Root>
)

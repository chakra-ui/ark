import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import { createMemo, createSignal } from 'solid-js'
import styles from 'styles/password-input.module.css'

export const WithValidation = () => {
  const [password, setPassword] = createSignal('')
  const isValid = createMemo(() => password().length >= 8)

  return (
    <PasswordInput.Root class={styles.Root} invalid={!isValid() && password().length > 0}>
      <PasswordInput.Label class={styles.Label}>Password (min 8 characters)</PasswordInput.Label>
      <PasswordInput.Control class={styles.Control}>
        <PasswordInput.Input
          class={styles.Input}
          onInput={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
          <PasswordInput.Indicator class={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      {password().length > 0 && !isValid() && (
        <p class={styles.ValidationMessage} data-valid="false">
          Password must be at least 8 characters
        </p>
      )}
      {isValid() && password().length > 0 && (
        <p class={styles.ValidationMessage} data-valid="true">
          Password is valid
        </p>
      )}
    </PasswordInput.Root>
  )
}

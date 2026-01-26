import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import styles from 'styles/password-input.module.css'

export const WithValidation = () => {
  const [password, setPassword] = useState('')
  const isValid = useMemo(() => password.length >= 8, [password])

  return (
    <PasswordInput.Root className={styles.Root} invalid={!isValid && password.length > 0}>
      <PasswordInput.Label className={styles.Label}>Password (min 8 characters)</PasswordInput.Label>
      <PasswordInput.Control className={styles.Control}>
        <PasswordInput.Input
          className={styles.Input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger className={styles.VisibilityTrigger}>
          <PasswordInput.Indicator className={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      {password.length > 0 && !isValid && (
        <p className={styles.ValidationMessage} data-valid="false">
          Password must be at least 8 characters
        </p>
      )}
      {isValid && password.length > 0 && (
        <p className={styles.ValidationMessage} data-valid="true">
          Password is valid
        </p>
      )}
    </PasswordInput.Root>
  )
}

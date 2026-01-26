import { PasswordInput } from '@ark-ui/react/password-input'
import { passwordStrength, type Options } from 'check-password-strength'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import styles from 'styles/password-input.module.css'

const strengthOptions: Options<string> = [
  { id: 0, value: 'weak', minDiversity: 0, minLength: 0 },
  { id: 1, value: 'medium', minDiversity: 2, minLength: 6 },
  { id: 2, value: 'strong', minDiversity: 4, minLength: 8 },
]

export const StrengthMeter = () => {
  const [password, setPassword] = useState('asdfasdf')

  const strength = useMemo(() => {
    if (!password) return null
    const { value } = passwordStrength(password, strengthOptions)
    return value
  }, [password])

  return (
    <PasswordInput.Root className={styles.Root}>
      <PasswordInput.Label className={styles.Label}>Password</PasswordInput.Label>
      <PasswordInput.Control className={styles.Control}>
        <PasswordInput.Input
          className={styles.Input}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger className={styles.VisibilityTrigger}>
          <PasswordInput.Indicator className={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      {strength && (
        <div className={styles.StrengthMeter}>
          <div className={styles.StrengthBar}>
            <div className={styles.StrengthFill} data-strength={strength} />
          </div>
          <div className={styles.StrengthLabel}>{strength} password</div>
        </div>
      )}
    </PasswordInput.Root>
  )
}

import { Meter } from '@ark-ui/react/meter'
import { useState } from 'react'
import styles from 'styles/meter.module.css'

const score = (password: string) => {
  let points = 0
  if (password.length >= 8) points++
  if (password.length >= 12) points++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++
  if (/\d/.test(password)) points++
  if (/[^a-zA-Z0-9]/.test(password)) points++
  return points
}

const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']

export const PasswordStrength = () => {
  const [password, setPassword] = useState('')
  const strength = score(password)

  return (
    <div className={styles.Field}>
      <input
        type="password"
        className={styles.Input}
        placeholder="Choose a password"
        aria-label="Password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <Meter.Root
        className={`${styles.Root} ${styles.Graded}`}
        value={strength}
        max={5}
        low={2}
        high={3}
        optimum={5}
        translations={{ value: ({ value }) => labels[value] }}
      >
        <Meter.Label className={styles.Label}>Strength</Meter.Label>
        <Meter.ValueText className={styles.ValueText} />
        <Meter.Track className={styles.Track}>
          <Meter.Indicator className={styles.Indicator} />
        </Meter.Track>
      </Meter.Root>
      <span className={styles.Hint}>Use 12 or more characters with a mix of letters, numbers and symbols.</span>
    </div>
  )
}

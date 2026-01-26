import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import styles from 'styles/password-input.module.css'

export const Autocomplete = () => (
  <PasswordInput.Root className={styles.Root} autoComplete="new-password">
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
)

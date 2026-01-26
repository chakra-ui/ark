import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import styles from 'styles/password-input.module.css'

export const IgnorePasswordManager = () => (
  <PasswordInput.Root className={styles.Root} ignorePasswordManagers>
    <PasswordInput.Label className={styles.Label}>API Key</PasswordInput.Label>
    <PasswordInput.Control className={styles.Control}>
      <PasswordInput.Input className={styles.Input} defaultValue="spd_1234567890" />
      <PasswordInput.VisibilityTrigger className={styles.VisibilityTrigger}>
        <PasswordInput.Indicator className={styles.Indicator} fallback={<EyeOffIcon />}>
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>
)

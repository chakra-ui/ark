import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import styles from 'styles/password-input.module.css'

export const IgnorePasswordManager = () => (
  <PasswordInput.Root class={styles.Root} ignorePasswordManagers>
    <PasswordInput.Label class={styles.Label}>API Key</PasswordInput.Label>
    <PasswordInput.Control class={styles.Control}>
      <PasswordInput.Input class={styles.Input} value="spd_1234567890" />
      <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
        <PasswordInput.Indicator class={styles.Indicator} fallback={<EyeOffIcon />}>
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>
)

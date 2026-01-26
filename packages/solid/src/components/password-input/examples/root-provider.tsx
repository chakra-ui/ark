import { PasswordInput, usePasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import styles from 'styles/password-input.module.css'

export const RootProvider = () => {
  const passwordInput = usePasswordInput()

  return (
    <div class="stack">
      <output>password input is {passwordInput().visible ? 'visible' : 'hidden'}</output>
      <PasswordInput.RootProvider class={styles.Root} value={passwordInput}>
        <PasswordInput.Label class={styles.Label}>Password</PasswordInput.Label>
        <PasswordInput.Control class={styles.Control}>
          <PasswordInput.Input class={styles.Input} />
          <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
            <PasswordInput.Indicator class={styles.Indicator} fallback={<EyeOffIcon />}>
              <EyeIcon />
            </PasswordInput.Indicator>
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
    </div>
  )
}

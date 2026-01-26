import { PasswordInput, usePasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import styles from 'styles/password-input.module.css'

export const RootProvider = () => {
  const passwordInput = usePasswordInput()

  return (
    <div className="stack">
      <output>password input is {passwordInput.visible ? 'visible' : 'hidden'}</output>
      <PasswordInput.RootProvider className={styles.Root} value={passwordInput}>
        <PasswordInput.Label className={styles.Label}>Password</PasswordInput.Label>
        <PasswordInput.Control className={styles.Control}>
          <PasswordInput.Input className={styles.Input} />
          <PasswordInput.VisibilityTrigger className={styles.VisibilityTrigger}>
            <PasswordInput.Indicator className={styles.Indicator} fallback={<EyeOffIcon />}>
              <EyeIcon />
            </PasswordInput.Indicator>
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
    </div>
  )
}

import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/password-input.module.css'

export const ControlledVisibility = () => {
  const [visible, setVisible] = useState(false)
  return (
    <PasswordInput.Root className={styles.Root} visible={visible} onVisibilityChange={(e) => setVisible(e.visible)}>
      <PasswordInput.Label className={styles.Label}>Password is {visible ? 'visible' : 'hidden'}</PasswordInput.Label>
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
}

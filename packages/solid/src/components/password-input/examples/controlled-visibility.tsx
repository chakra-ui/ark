import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/password-input.module.css'

export const ControlledVisibility = () => {
  const [visible, setVisible] = createSignal(false)
  return (
    <PasswordInput.Root class={styles.Root} visible={visible()} onVisibilityChange={(e) => setVisible(e.visible)}>
      <PasswordInput.Label class={styles.Label}>Password is {visible() ? 'visible' : 'hidden'}</PasswordInput.Label>
      <PasswordInput.Control class={styles.Control}>
        <PasswordInput.Input class={styles.Input} />
        <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
          <PasswordInput.Indicator class={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
  )
}

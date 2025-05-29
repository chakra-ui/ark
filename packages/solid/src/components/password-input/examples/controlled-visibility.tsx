import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'

export const ControlledVisibility = () => {
  const [visible, setVisible] = createSignal(false)
  return (
    <PasswordInput.Root visible={visible()} onVisibilityChange={(e) => setVisible(e.visible)}>
      <PasswordInput.Label>Password is {visible() ? 'visible' : 'hidden'}</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
  )
}

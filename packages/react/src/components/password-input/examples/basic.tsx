import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export const Basic = () => (
  <PasswordInput.Root>
    <PasswordInput.Label>Password</PasswordInput.Label>
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

import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'

export const IgnorePasswordManager = () => (
  <PasswordInput.Root ignorePasswordManagers>
    <PasswordInput.Label>API Key</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input value="spd_1234567890" />
      <PasswordInput.VisibilityTrigger>
        <PasswordInput.Indicator fallback={<EyeOffIcon />}>
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>
)

import { Field } from '@ark-ui/solid/field'
import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'

export const WithField = () => (
  <Field.Root>
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
    <Field.HelperText>Enter your password</Field.HelperText>
    <Field.ErrorText>Password is required</Field.ErrorText>
  </Field.Root>
)

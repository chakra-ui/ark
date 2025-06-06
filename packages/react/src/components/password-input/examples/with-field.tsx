import { Field } from '@ark-ui/react/field'
import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

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

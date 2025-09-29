import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import { createSignal, createMemo } from 'solid-js'

export const WithValidation = () => {
  const [password, setPassword] = createSignal('')
  const isValid = createMemo(() => password().length >= 8)

  return (
    <div>
      <PasswordInput.Root invalid={!isValid() && password().length > 0}>
        <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input onInput={(e) => setPassword(e.currentTarget.value)} placeholder="Enter your password" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator fallback={<EyeOffIcon />}>
              <EyeIcon />
            </PasswordInput.Indicator>
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.Root>

      {password().length > 0 && !isValid() && (
        <p style={{ color: 'red', 'margin-top': '4px' }}>Password must be at least 8 characters</p>
      )}

      {isValid() && password().length > 0 && <p style={{ color: 'green', 'margin-top': '4px' }}>Password is valid ✓</p>}
    </div>
  )
}

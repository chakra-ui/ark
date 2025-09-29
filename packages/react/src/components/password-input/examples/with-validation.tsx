import { PasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState, useMemo } from 'react'

export const WithValidation = () => {
  const [password, setPassword] = useState('')
  const isValid = useMemo(() => password.length >= 8, [password])

  return (
    <div>
      <PasswordInput.Root invalid={!isValid && password.length > 0}>
        <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator fallback={<EyeOffIcon />}>
              <EyeIcon />
            </PasswordInput.Indicator>
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.Root>

      {password.length > 0 && !isValid && (
        <p style={{ color: 'red', marginTop: '4px' }}>Password must be at least 8 characters</p>
      )}

      {isValid && password.length > 0 && <p style={{ color: 'green', marginTop: '4px' }}>Password is valid ✓</p>}
    </div>
  )
}

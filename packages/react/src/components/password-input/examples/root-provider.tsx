import { PasswordInput, usePasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export const RootProvider = () => {
  const passwordInput = usePasswordInput()

  return (
    <>
      <button onClick={() => passwordInput.focus()}>Focus</button>
      <button onClick={() => passwordInput.setVisible(!passwordInput.visible)}>
        {passwordInput.visible ? 'Hide' : 'Show'} Password
      </button>

      <PasswordInput.RootProvider value={passwordInput}>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator fallback={<EyeOffIcon />}>
              <EyeIcon />
            </PasswordInput.Indicator>
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
    </>
  )
}

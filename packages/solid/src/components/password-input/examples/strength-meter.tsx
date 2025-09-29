import { PasswordInput } from '@ark-ui/solid/password-input'
import { passwordStrength, type Options } from 'check-password-strength'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import { createMemo, createSignal, Show } from 'solid-js'

const strengthOptions: Options<string> = [
  { id: 0, value: 'weak', minDiversity: 0, minLength: 0 },
  { id: 1, value: 'medium', minDiversity: 2, minLength: 6 },
  { id: 2, value: 'strong', minDiversity: 4, minLength: 8 },
]

const strengthMap = new Map([
  ['weak', { color: 'red', width: '30%' }],
  ['medium', { color: 'orange', width: '60%' }],
  ['strong', { color: 'green', width: '100%' }],
])

export const StrengthMeter = () => {
  const [password, setPassword] = createSignal('')

  const strength = createMemo(() => {
    if (!password()) return null
    const { value } = passwordStrength(password(), strengthOptions)
    const data = strengthMap.get(value)
    return data ? { value, ...data } : null
  })

  return (
    <PasswordInput.Root style={{ 'max-width': '400px' }}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      <Show when={strength()}>
        {(value) => (
          <div style={{ 'margin-top': '8px' }}>
            <div role="progressbar" style={{ height: '8px', border: '1px solid lightgray' }}>
              <div style={{ height: '100%', background: value().color, width: value().width }} role="presentation" />
            </div>
            <div style={{ 'margin-top': '4px', 'font-size': '12px', 'text-transform': 'capitalize' }}>
              {value().value} password
            </div>
          </div>
        )}
      </Show>
    </PasswordInput.Root>
  )
}

import { PasswordInput } from '@ark-ui/solid/password-input'
import { passwordStrength, type Options } from 'check-password-strength'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'
import { createMemo, createSignal, Show } from 'solid-js'
import styles from 'styles/password-input.module.css'

const strengthOptions: Options<string> = [
  { id: 0, value: 'weak', minDiversity: 0, minLength: 0 },
  { id: 1, value: 'medium', minDiversity: 2, minLength: 6 },
  { id: 2, value: 'strong', minDiversity: 4, minLength: 8 },
]

export const StrengthMeter = () => {
  const [password, setPassword] = createSignal('asdfasdf')

  const strength = createMemo(() => {
    if (!password()) return null
    const { value } = passwordStrength(password(), strengthOptions)
    return value
  })

  return (
    <PasswordInput.Root class={styles.Root}>
      <PasswordInput.Label class={styles.Label}>Password</PasswordInput.Label>
      <PasswordInput.Control class={styles.Control}>
        <PasswordInput.Input
          class={styles.Input}
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
          <PasswordInput.Indicator class={styles.Indicator} fallback={<EyeOffIcon />}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      <Show when={strength()}>
        {(value) => (
          <div class={styles.StrengthMeter}>
            <div class={styles.StrengthBar}>
              <div class={styles.StrengthFill} data-strength={value()} />
            </div>
            <div class={styles.StrengthLabel}>{value()} password</div>
          </div>
        )}
      </Show>
    </PasswordInput.Root>
  )
}

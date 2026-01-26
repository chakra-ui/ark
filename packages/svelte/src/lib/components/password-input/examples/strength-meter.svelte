<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { passwordStrength, type Options } from 'check-password-strength'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
  import styles from 'styles/password-input.module.css'

  const strengthOptions: Options<string> = [
    { id: 0, value: 'weak', minDiversity: 0, minLength: 0 },
    { id: 1, value: 'medium', minDiversity: 2, minLength: 6 },
    { id: 2, value: 'strong', minDiversity: 4, minLength: 8 },
  ]

  let password = $state('asdfasdf')

  const strength = $derived.by(() => {
    if (!password) return null
    const { value } = passwordStrength(password, strengthOptions)
    return value
  })
</script>

<PasswordInput.Root class={styles.Root}>
  <PasswordInput.Label class={styles.Label}>Password</PasswordInput.Label>
  <PasswordInput.Control class={styles.Control}>
    <PasswordInput.Input class={styles.Input} bind:value={password} placeholder="Enter your password" />
    <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
      <PasswordInput.Indicator class={styles.Indicator}>
        {#snippet fallback()}
          <EyeOffIcon />
        {/snippet}
        <EyeIcon />
      </PasswordInput.Indicator>
    </PasswordInput.VisibilityTrigger>
  </PasswordInput.Control>
  {#if strength}
    <div class={styles.StrengthMeter}>
      <div class={styles.StrengthBar}>
        <div class={styles.StrengthFill} data-strength={strength}></div>
      </div>
      <div class={styles.StrengthLabel}>{strength} password</div>
    </div>
  {/if}
</PasswordInput.Root>

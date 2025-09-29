<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { passwordStrength, type Options } from 'check-password-strength'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'

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

  let password = $state('')

  const strength = $derived.by(() => {
    if (!password) return null
    const { value } = passwordStrength(password, strengthOptions)
    const data = strengthMap.get(value)
    return data ? { value, ...data } : null
  })
</script>

<PasswordInput.Root style="max-width: 400px;">
  <PasswordInput.Label>Password</PasswordInput.Label>
  <PasswordInput.Control>
    <PasswordInput.Input bind:value={password} placeholder="Enter your password" />
    <PasswordInput.VisibilityTrigger>
      <PasswordInput.Indicator>
        {#snippet fallback()}
          <EyeOffIcon />
        {/snippet}
        <EyeIcon />
      </PasswordInput.Indicator>
    </PasswordInput.VisibilityTrigger>
  </PasswordInput.Control>
  {#if strength}
    <div style="margin-top: 8px;">
      <div role="progressbar" style="height: 8px; border: 1px solid lightgray;">
        <div style="height: 100%; background: {strength.color}; width: {strength.width};" role="presentation"></div>
      </div>
      <div style="margin-top: 4px; font-size: 12px; text-transform: capitalize;">
        {strength.value} password
      </div>
    </div>
  {/if}
</PasswordInput.Root>

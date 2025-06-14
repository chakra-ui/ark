<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'

  let password = $state('')
  let isValid = $derived(password.length >= 8)
</script>

<div>
  <PasswordInput.Root invalid={!isValid && password.length > 0}>
    <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input oninput={(e) => (password = (e.target as HTMLInputElement).value)} />
      <PasswordInput.VisibilityTrigger>
        <PasswordInput.Indicator>
          {#snippet fallback()}
            <EyeOffIcon />
          {/snippet}
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>

  {#if password.length > 0 && !isValid}
    <p style="color: red; margin-top: 4px;">Password must be at least 8 characters</p>
  {/if}

  {#if isValid && password.length > 0}
    <p style="color: green; margin-top: 4px;">Password is valid ✓</p>
  {/if}
</div>

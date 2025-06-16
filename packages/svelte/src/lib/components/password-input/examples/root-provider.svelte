<script lang="ts">
  import { PasswordInput, usePasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'

  const id = $props.id()

  const passwordInput = usePasswordInput({ id })
</script>

<div>
  <button onclick={() => passwordInput().setVisible(true)}>Show Password</button>
  <button onclick={() => passwordInput().setVisible(false)}>Hide Password</button>

  <PasswordInput.RootProvider value={passwordInput}>
    <PasswordInput.Label>Password (with external control)</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input />
      <PasswordInput.VisibilityTrigger>
        <PasswordInput.Indicator>
          {#snippet fallback()}
            <EyeOffIcon />
          {/snippet}
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.RootProvider>
</div>

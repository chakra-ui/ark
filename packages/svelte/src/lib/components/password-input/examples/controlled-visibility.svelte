<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'

  let visible = $state(false)
</script>

<div>
  <pre>{JSON.stringify({ visible }, null, 2)}</pre>

  <button onclick={() => (visible = !visible)}>Toggle Visibility</button>

  <PasswordInput.Root bind:visible>
    <PasswordInput.Label>Password (controlled)</PasswordInput.Label>
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
  </PasswordInput.Root>
</div>

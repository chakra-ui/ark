<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
  import styles from 'styles/password-input.module.css'

  let password = $state('')
  let isValid = $derived(password.length >= 8)
</script>

<PasswordInput.Root class={styles.Root} invalid={!isValid && password.length > 0}>
  <PasswordInput.Label class={styles.Label}>Password (min 8 characters)</PasswordInput.Label>
  <PasswordInput.Control class={styles.Control}>
    <PasswordInput.Input class={styles.Input} oninput={(e) => (password = e.currentTarget.value)} placeholder="Enter your password" />
    <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
      <PasswordInput.Indicator class={styles.Indicator}>
        {#snippet fallback()}
          <EyeOffIcon />
        {/snippet}
        <EyeIcon />
      </PasswordInput.Indicator>
    </PasswordInput.VisibilityTrigger>
  </PasswordInput.Control>
  {#if password.length > 0 && !isValid}
    <p class={styles.ValidationMessage} data-valid="false">Password must be at least 8 characters</p>
  {/if}
  {#if isValid && password.length > 0}
    <p class={styles.ValidationMessage} data-valid="true">Password is valid</p>
  {/if}
</PasswordInput.Root>

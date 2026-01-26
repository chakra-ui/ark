<script lang="ts">
  import { PasswordInput, usePasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
  import styles from 'styles/password-input.module.css'

  const id = $props.id()

  const passwordInput = usePasswordInput({ id })
</script>

<div class="stack">
  <output>password input is {passwordInput().visible ? 'visible' : 'hidden'}</output>
  <PasswordInput.RootProvider class={styles.Root} value={passwordInput}>
    <PasswordInput.Label class={styles.Label}>Password</PasswordInput.Label>
    <PasswordInput.Control class={styles.Control}>
      <PasswordInput.Input class={styles.Input} />
      <PasswordInput.VisibilityTrigger class={styles.VisibilityTrigger}>
        <PasswordInput.Indicator class={styles.Indicator}>
          {#snippet fallback()}
            <EyeOffIcon />
          {/snippet}
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.RootProvider>
</div>

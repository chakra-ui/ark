<script lang="ts">
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
  import styles from 'styles/password-input.module.css'

  let visible = $state(false)
</script>

<PasswordInput.Root class={styles.Root} bind:visible>
  <PasswordInput.Label class={styles.Label}>
    Password is {visible ? 'visible' : 'hidden'}
  </PasswordInput.Label>
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
</PasswordInput.Root>

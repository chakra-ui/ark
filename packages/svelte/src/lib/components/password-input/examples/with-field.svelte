<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
  import field from 'styles/field.module.css'
  import styles from 'styles/password-input.module.css'
</script>

<Field.Root class={field.Root}>
  <PasswordInput.Root class={styles.Root}>
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
  </PasswordInput.Root>
  <Field.HelperText class={field.HelperText}>Enter your password</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Password is required</Field.ErrorText>
</Field.Root>

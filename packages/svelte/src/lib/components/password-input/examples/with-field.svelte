<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { PasswordInput } from '@ark-ui/svelte/password-input'
  import { EyeIcon, EyeOffIcon } from 'lucide-svelte'
</script>

<Field.Root>
  <PasswordInput.Root>
    <PasswordInput.Label>Password</PasswordInput.Label>
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
  <Field.HelperText>Enter your password</Field.HelperText>
  <Field.ErrorText>Password is required</Field.ErrorText>
</Field.Root>

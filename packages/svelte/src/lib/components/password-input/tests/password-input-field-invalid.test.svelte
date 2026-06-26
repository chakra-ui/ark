<script lang="ts">
  import { Field } from '../../field/index.ts'
  import { PasswordInput } from '../index.ts'
</script>

<Field.Root invalid>
  <PasswordInput.Root>
    <PasswordInput.Control>
      <PasswordInput.Input data-testid="password-input" />
    </PasswordInput.Control>
  </PasswordInput.Root>
  <Field.ErrorText>Password is required</Field.ErrorText>
</Field.Root>

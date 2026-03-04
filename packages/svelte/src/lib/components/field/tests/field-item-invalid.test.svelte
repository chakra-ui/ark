<script lang="ts">
  import { Field } from '../'
</script>

<Field.Root invalid target="amount">
  <Field.Label>Amount</Field.Label>
  <Field.Item value="amount">
    <Field.Input data-testid="amount-input" />
  </Field.Item>
  <Field.ErrorText>Invalid amount</Field.ErrorText>
</Field.Root>

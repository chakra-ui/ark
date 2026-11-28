<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'
  import { Field } from '../index.ts'
</script>

<Field.Root target="amount">
  <Field.Label>Amount</Field.Label>
  <Field.Item value="currency">
    <Field.Select data-testid="currency-select">
      <option value="USD">USD</option>
    </Field.Select>
  </Field.Item>
  <Field.Item value="amount">
    <NumberInput.Root>
      <NumberInput.Input data-testid="number-input" />
    </NumberInput.Root>
  </Field.Item>
  <Field.HelperText>Enter the amount</Field.HelperText>
</Field.Root>

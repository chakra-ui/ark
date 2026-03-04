<script lang="ts">
  import { Field } from '../'
</script>

<Field.Root target="currency">
  <Field.Label>Currency</Field.Label>
  <Field.Item value="currency">
    <Field.Select data-testid="currency-select">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </Field.Select>
  </Field.Item>
  <Field.Input data-testid="amount-input" />
  <Field.HelperText>Select a currency</Field.HelperText>
</Field.Root>

<script lang="ts">
  import { Field } from '../index.ts'
</script>

<Field.Root target="amount" ids={{ control: 'custom-control' }}>
  <Field.Label>Amount</Field.Label>
  <Field.Item value="amount">
    <Field.Input />
  </Field.Item>
</Field.Root>

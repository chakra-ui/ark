<script lang="ts">
  import { Field } from '../index.ts'
</script>

<Field.Root target="custom">
  <Field.Label>Custom</Field.Label>
  <Field.Item value="custom">
    <Field.Context>
      {#snippet render(field)}
        <input data-testid="custom-input" {...field?.()?.getInputProps()} />
      {/snippet}
    </Field.Context>
  </Field.Item>
</Field.Root>

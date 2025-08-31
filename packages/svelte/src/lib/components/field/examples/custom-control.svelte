<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root invalid>
  <Field.Label>Any Control</Field.Label>
  <Field.Context>
    {#snippet render(field)}
      <input {...field().getInputProps()} />
    {/snippet}
  </Field.Context>
  <Field.HelperText>Uses getControlProps() for maximum flexibility</Field.HelperText>
  <Field.ErrorText>This field has an error</Field.ErrorText>
</Field.Root>

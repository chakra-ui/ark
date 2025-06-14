<script lang="ts">
  import { Field, useField } from '@ark-ui/svelte/field'

  const id = $props.id()

  const field = useField({ id, invalid: true, required: true })
</script>

<Field.RootProvider value={field}>
  <Field.Label>
    Label
    <Field.RequiredIndicator>*</Field.RequiredIndicator>
  </Field.Label>
  <Field.Input />
  <Field.ErrorText>This field has an error</Field.ErrorText>
</Field.RootProvider>

<Field.Context>
  {#snippet render(field)}
    <p>Field ID: {field().ids.control}</p>
    <p>Required: {field().required}</p>
    <p>Invalid: {field().invalid}</p>
  {/snippet}
</Field.Context>

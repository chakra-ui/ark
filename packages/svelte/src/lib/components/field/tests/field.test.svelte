<script lang="ts">
  import { Field } from '../index.ts'

  let props: Partial<Field.RootProps> = $props()
</script>

<Field.Root {...props}>
  <Field.Label>
    Label
    <Field.Indicator type="required">*</Field.Indicator>
  </Field.Label>
  <Field.Input />
  <Field.HelperText>Some additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

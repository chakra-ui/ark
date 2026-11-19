<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Field } from '@ark-ui/svelte/field'

  const props: Field.RootProps = $props()
</script>

<Field.Root {...props}>
  <Checkbox.Root>
    <Checkbox.Control />
    <Checkbox.Label>Label</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { NumberInput } from '@ark-ui/svelte/number-input'

  const props: Field.RootProps = $props()
</script>

<Field.Root {...props}>
  <NumberInput.Root>
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.Input />
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

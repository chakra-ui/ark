<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'

  let value = $state('Input is controlled')
</script>

<span>Input text: {value}</span>
<Field.Root>
  <Field.Label>Label</Field.Label>
  <Field.Input bind:value />
  <Field.HelperText>Some additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

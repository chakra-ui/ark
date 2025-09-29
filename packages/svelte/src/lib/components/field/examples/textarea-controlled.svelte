<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'

  let value = $state('This is some text\nthen more text')
</script>

<span>Textarea value: {value}</span>
<Field.Root>
  <Field.Label>Label</Field.Label>
  <Field.Textarea bind:value />
  <Field.HelperText>Some additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

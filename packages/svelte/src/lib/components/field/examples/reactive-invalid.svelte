<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'

  let errorMessage = $state('')
  const invalid = $derived(!!errorMessage)
</script>

<input bind:value={errorMessage} />
<Field.Root {invalid}>
  IsInvalid? {invalid}
  <Field.ErrorText style="color: red">{errorMessage}</Field.ErrorText>
</Field.Root>

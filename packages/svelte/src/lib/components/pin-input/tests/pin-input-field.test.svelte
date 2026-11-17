<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { PinInput } from '@ark-ui/svelte/pin-input'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <PinInput.Root>
    <PinInput.Control>
      {#each [0, 1, 2] as index (index)}
        <PinInput.Input {index} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

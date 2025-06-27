<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { PinInput } from '@ark-ui/svelte/pin-input'
</script>

<Field.Root>
  <PinInput.Root>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      {#each [0, 1, 2] as id, index (id)}
        <PinInput.Input {index} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

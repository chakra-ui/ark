<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'
</script>

<PinInput.Root defaultValue={['1', '2', '3']}>
  <PinInput.Label>Enter your PIN (default: 123)</PinInput.Label>
  <PinInput.Control>
    {#each [0, 1, 2] as index}
      <PinInput.Input {index} />
    {/each}
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput.Root>

<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'
</script>

<PinInput.Root onValueComplete={(details) => alert(details.valueAsString)}>
  <PinInput.Label>Label</PinInput.Label>
  <PinInput.Control>
    {#each [0, 1, 2] as index}
      <PinInput.Input {index} />
    {/each}
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput.Root>

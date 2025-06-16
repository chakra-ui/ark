<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'
</script>

<PinInput.Root mask>
  <PinInput.Label>Enter your secure PIN</PinInput.Label>
  <PinInput.Control>
    {#each [0, 1, 2, 3] as index}
      <PinInput.Input {index} />
    {/each}
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput.Root>

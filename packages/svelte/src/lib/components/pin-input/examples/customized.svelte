<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'

  let value = $state(['', '', '', ''])
</script>

<div>
  <pre>{JSON.stringify({ value }, null, 2)}</pre>

  <PinInput.Root bind:value placeholder="○">
    <PinInput.Label>Enter PIN</PinInput.Label>
    <PinInput.Control>
      {#each [0, 1, 2, 3] as index}
        <PinInput.Input {index} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
</div>

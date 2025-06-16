<script lang="ts">
  import { PinInput, usePinInput } from '@ark-ui/svelte/pin-input'

  const id = $props.id()

  const pinInput = usePinInput({
    id,
    count: 3,
  })
</script>

<div>
  <button onclick={() => pinInput().setValue(['1', '2', '3'])}>Set to 123</button>
  <button onclick={() => pinInput().clearValue()}>Clear</button>

  <PinInput.RootProvider value={pinInput}>
    <PinInput.Label>PIN (with external control)</PinInput.Label>
    <PinInput.Control>
      {#each [0, 1, 2] as index}
        <PinInput.Input {index} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.RootProvider>
</div>

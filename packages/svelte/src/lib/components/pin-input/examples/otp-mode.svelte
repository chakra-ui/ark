<script lang="ts">
  import { PinInput } from '@ark-ui/svelte/pin-input'
</script>

<PinInput.Root otp>
  <PinInput.Label>Enter verification code</PinInput.Label>
  <PinInput.Control>
    {#each [0, 1, 2, 3, 4, 5] as index}
      <PinInput.Input {index} />
    {/each}
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput.Root>

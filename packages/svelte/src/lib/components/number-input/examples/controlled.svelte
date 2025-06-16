<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'

  let value = $state('10')
</script>

<div>
  <p>Current value: {value}</p>
  <NumberInput.Root bind:value>
    <NumberInput.Scrubber />
    <NumberInput.Label>Count</NumberInput.Label>
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
      <NumberInput.Input />
      <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</div>

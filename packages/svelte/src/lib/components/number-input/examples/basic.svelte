<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'
</script>

<NumberInput.Root>
  <NumberInput.Label>Count</NumberInput.Label>
  <NumberInput.Control>
    <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
    <NumberInput.Input />
    <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>

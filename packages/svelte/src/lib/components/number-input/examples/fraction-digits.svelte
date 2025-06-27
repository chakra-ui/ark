<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'
</script>

<NumberInput.Root formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 3 }} defaultValue="1.00">
  <NumberInput.Scrubber />
  <NumberInput.Label>Label</NumberInput.Label>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
    <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>

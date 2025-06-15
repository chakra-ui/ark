<script lang="ts">
  import { NumberInput, useNumberInput } from '@ark-ui/svelte/number-input'

  const id = $props.id()
  const numberInput = useNumberInput({ id })
</script>

<NumberInput.RootProvider value={numberInput}>
  <NumberInput.Scrubber />
  <NumberInput.Label>Count</NumberInput.Label>
  <NumberInput.Control>
    <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
    <NumberInput.Input />
    <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
  </NumberInput.Control>
</NumberInput.RootProvider>

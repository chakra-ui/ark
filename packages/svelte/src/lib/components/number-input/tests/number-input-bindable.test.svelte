<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'

  let value = $state(3)
</script>

<button type="button" onclick={() => (value = 8)}>set 8</button>
<NumberInput.Root bind:value>
  <NumberInput.Label>Count</NumberInput.Label>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>
<output data-testid="value">{value}</output>

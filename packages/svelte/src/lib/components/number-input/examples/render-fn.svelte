<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'
</script>

<NumberInput.Root>
  <NumberInput.Scrubber />
  <NumberInput.Context>
    {#snippet render(numberInput)}
      <NumberInput.Label>Count: {numberInput().value}</NumberInput.Label>
    {/snippet}
  </NumberInput.Context>
  <NumberInput.Control>
    <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
    <NumberInput.Input />
    <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>

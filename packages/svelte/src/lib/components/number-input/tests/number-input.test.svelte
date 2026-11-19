<script lang="ts">
  import { NumberInput } from '@ark-ui/svelte/number-input'

  const props: NumberInput.RootProps = $props()
</script>

<NumberInput.Root {...props}>
  <NumberInput.Label>Label</NumberInput.Label>
  <NumberInput.Input />
  <NumberInput.Control data-testid="control">
    <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
    <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>

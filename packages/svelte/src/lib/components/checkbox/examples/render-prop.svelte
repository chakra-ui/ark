<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
</script>

<Checkbox.Root>
  <Checkbox.Control>
    <Checkbox.Indicator><CheckIcon /></Checkbox.Indicator>
  </Checkbox.Control>

  <Checkbox.Context>
    {#snippet render(api)}
      <Checkbox.Label>Checkbox {api().checked.toString()}</Checkbox.Label>
    {/snippet}
  </Checkbox.Context>
  <Checkbox.HiddenInput />
</Checkbox.Root>

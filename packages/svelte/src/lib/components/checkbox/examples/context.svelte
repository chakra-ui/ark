<script lang="ts">
  import { Checkbox } from '..'
  import CheckIcon from './check-icon.svelte'
</script>

<Checkbox.Root>
  <Checkbox.Context>
    {#snippet api(checkbox)}
      <Checkbox.Label>Checkbox {checkbox().checked.toString()}</Checkbox.Label>
    {/snippet}
  </Checkbox.Context>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.Root>

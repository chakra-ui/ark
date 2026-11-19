<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'

  let checked = $state<Checkbox.CheckedState>(false)
</script>

<button type="button" onclick={() => (checked = true)}>set checked</button>
<Checkbox.Root bind:checked>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control />
  <Checkbox.HiddenInput />
</Checkbox.Root>
<output data-testid="checked">{String(checked)}</output>

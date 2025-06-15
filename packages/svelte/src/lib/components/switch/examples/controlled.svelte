<script>
  import { Switch } from '@ark-ui/svelte/switch'

  let checked = $state(false)
</script>

<div>
  <div>Checked: {checked}</div>
  <Switch.Root bind:checked>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Toggle me</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</div>

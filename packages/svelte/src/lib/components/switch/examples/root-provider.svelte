<script>
  import { Switch, useSwitch } from '@ark-ui/svelte/switch'

  const id = $props.id()
  const switchApi = useSwitch({ id })
</script>

<button onclick={() => switchApi().toggleChecked()}>Toggle</button>

<Switch.RootProvider value={switchApi}>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label>Label</Switch.Label>
  <Switch.HiddenInput />
</Switch.RootProvider>

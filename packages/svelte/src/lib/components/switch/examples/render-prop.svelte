<script lang="ts">
  import { Switch } from '@ark-ui/svelte/switch'
</script>

<Switch.Root>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Context>
    {#snippet render(context)}
      <Switch.Label>Feature is {context().checked ? 'enabled' : 'disabled'}</Switch.Label>
    {/snippet}
  </Switch.Context>
  <Switch.HiddenInput />
</Switch.Root>

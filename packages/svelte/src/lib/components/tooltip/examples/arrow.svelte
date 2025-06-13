<script lang="ts">
  import { Tooltip } from '@ark-ui/svelte/tooltip'
</script>

<Tooltip.Root id="tooltip-arrow">
  <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
      I am a tooltip with an arrow!
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>

<script lang="ts">
  import { Drawer } from '@ark-ui/svelte/drawer'
</script>

<Drawer.Root lazyMount unmountOnExit>
  <Drawer.Trigger>Open Drawer</Drawer.Trigger>
  <Drawer.Backdrop data-testid="drawer-backdrop" />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Title>Title</Drawer.Title>
      <Drawer.CloseTrigger>Close Drawer</Drawer.CloseTrigger>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

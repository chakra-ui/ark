<script lang="ts">
  import { Drawer } from '@ark-ui/svelte/drawer'
  import { Portal } from '@ark-ui/svelte/portal'

  const props: Drawer.RootProps = $props()
</script>

<Drawer.Root {...props}>
  <Drawer.Trigger>Open Drawer</Drawer.Trigger>
  <Portal>
    <Drawer.Backdrop />
    <Drawer.Positioner data-testid="positioner">
      <Drawer.Content>
        <Drawer.Grabber data-testid="grabber">
          <Drawer.GrabberIndicator />
        </Drawer.Grabber>
        <Drawer.Title>Drawer Title</Drawer.Title>
        <Drawer.Description>Drawer Description</Drawer.Description>
        <Drawer.CloseTrigger>Close</Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Portal>
</Drawer.Root>

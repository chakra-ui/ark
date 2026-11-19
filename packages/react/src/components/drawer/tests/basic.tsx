import { Drawer } from '@ark-ui/react/drawer'
import { Portal } from '@ark-ui/react/portal'

export const ComponentUnderTest = (props: Drawer.RootProps) => (
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
)

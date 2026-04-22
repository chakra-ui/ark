import { XIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { IconButton } from '~/components/ui/icon-button'

export const Demo = (props: Drawer.RootProps) => {
  return (
    <Drawer.Root swipeDirection="end" {...props}>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>Drawer Description</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            <p>This is the content of the drawer.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Drawer.CloseTrigger>
            <Button>Save</Button>
          </Drawer.Footer>
          <Drawer.CloseTrigger asChild position="absolute" top="2" right="2">
            <IconButton aria-label="Close Drawer" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

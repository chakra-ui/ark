import { FloatingPanel } from '@ark-ui/solid/floating-panel'
import { Portal } from 'solid-js/web'

export const ComponentUnderTest = (props: FloatingPanel.RootProps) => (
  <FloatingPanel.Root {...props}>
    <FloatingPanel.Trigger>Open Panel</FloatingPanel.Trigger>
    <Portal>
      <FloatingPanel.Positioner data-testid="positioner">
        <FloatingPanel.Content>
          <FloatingPanel.Header>
            <FloatingPanel.Title>Floating Panel</FloatingPanel.Title>
            <FloatingPanel.CloseTrigger>Close</FloatingPanel.CloseTrigger>
          </FloatingPanel.Header>
          <FloatingPanel.Body>Panel Body</FloatingPanel.Body>
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </Portal>
  </FloatingPanel.Root>
)

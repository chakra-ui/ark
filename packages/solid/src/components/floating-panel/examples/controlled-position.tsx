import { FloatingPanel } from '@ark-ui/solid/floating-panel'
import { ArrowDownLeft, Maximize2, Minus, XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const ControlledPosition = () => {
  const [position, setPosition] = createSignal({ x: 200, y: 200 })

  return (
    <FloatingPanel.Root position={position()} onPositionChange={(e) => setPosition(e.position)}>
      <FloatingPanel.Trigger>Toggle Panel</FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>Floating Panel</FloatingPanel.Title>
                <FloatingPanel.Control>
                  <FloatingPanel.StageTrigger stage="minimized">
                    <Minus />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger stage="maximized">
                    <Maximize2 />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger stage="default">
                    <ArrowDownLeft />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.CloseTrigger>
                    <XIcon />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body>
              <p>Some content</p>
            </FloatingPanel.Body>

            <FloatingPanel.ResizeTrigger axis="n" />
            <FloatingPanel.ResizeTrigger axis="e" />
            <FloatingPanel.ResizeTrigger axis="w" />
            <FloatingPanel.ResizeTrigger axis="s" />
            <FloatingPanel.ResizeTrigger axis="ne" />
            <FloatingPanel.ResizeTrigger axis="se" />
            <FloatingPanel.ResizeTrigger axis="sw" />
            <FloatingPanel.ResizeTrigger axis="nw" />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}

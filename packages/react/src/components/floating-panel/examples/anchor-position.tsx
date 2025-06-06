import { FloatingPanel } from '@ark-ui/react/floating-panel'
import { Portal } from '@ark-ui/react/portal'
import { ArrowDownLeft, Maximize2, Minus, XIcon } from 'lucide-react'

export const AnchorPosition = () => (
  <FloatingPanel.Root
    getAnchorPosition={({ triggerRect }) => {
      if (!triggerRect) return { x: 0, y: 0 }
      return {
        x: triggerRect.x + triggerRect.width / 2,
        y: triggerRect.y + triggerRect.height / 2,
      }
    }}
  >
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

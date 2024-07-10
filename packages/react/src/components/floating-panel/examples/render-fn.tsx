import { ArrowDownLeft, Maximize2, Minus, XIcon } from 'lucide-react'
import { FloatingPanel, Portal } from '../..'

export const RenderFn = () => (
  <FloatingPanel.Root>
    <FloatingPanel.Trigger>Toggle Panel</FloatingPanel.Trigger>
    <Portal>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>Floating Panel</FloatingPanel.Title>
              <div data-scope="floating-panel" data-part="trigger-group">
                <FloatingPanel.MinimizeTrigger>
                  <Minus />
                </FloatingPanel.MinimizeTrigger>
                <FloatingPanel.MaximizeTrigger>
                  <Maximize2 />
                </FloatingPanel.MaximizeTrigger>
                <FloatingPanel.RestoreTrigger>
                  <ArrowDownLeft />
                </FloatingPanel.RestoreTrigger>
                <FloatingPanel.CloseTrigger>
                  <XIcon />
                </FloatingPanel.CloseTrigger>
              </div>
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
    <FloatingPanel.Context>
      {(floatingPanel) => <p>floatingPanel. is {floatingPanel.open ? 'open' : 'closed'}</p>}
    </FloatingPanel.Context>
  </FloatingPanel.Root>
)

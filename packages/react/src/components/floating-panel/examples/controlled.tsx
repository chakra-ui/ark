import { ArrowDownLeft, Maximize2, Minus, XIcon } from 'lucide-react'
import { useState } from 'react'
import { FloatingPanel, Portal } from '../..'

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FloatingPanel.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <FloatingPanel.Trigger onClick={() => setIsOpen(true)}>Toggle Panel</FloatingPanel.Trigger>
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

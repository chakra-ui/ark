import { FloatingPanel, type FloatingPanelRootProps, Portal } from '../..'

export const ComponentUnderTest = (props: FloatingPanelRootProps) => (
  <FloatingPanel.Root {...props}>
    <FloatingPanel.Trigger>Open FloatingPanel</FloatingPanel.Trigger>
    <FloatingPanel.Dock />
    <Portal>
      <FloatingPanel.Positioner data-testid="positioner">
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>FloatingPanel Title</FloatingPanel.Title>
              <FloatingPanel.StageTrigger stage="minimized">minimize window</FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="maximized">maximize window</FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="default">restore window</FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger>close window</FloatingPanel.CloseTrigger>
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

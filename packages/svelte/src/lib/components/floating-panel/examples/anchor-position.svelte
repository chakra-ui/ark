<script lang="ts">
  import { FloatingPanel } from '@ark-ui/svelte/floating-panel'
  import { Portal } from '@ark-ui/svelte/portal'
</script>

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
                <span>−</span>
              </FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="maximized">
                <span>□</span>
              </FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="default">
                <span>↗</span>
              </FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger>
                <span>×</span>
              </FloatingPanel.CloseTrigger>
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body>
          <p>Some content</p>
          <p>Anchored to trigger center</p>
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

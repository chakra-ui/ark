<script lang="ts">
  import { FloatingPanel } from '@ark-ui/svelte/floating-panel'
  import { Portal } from '@ark-ui/svelte/portal'

  let position = $state({ x: 200, y: 200 })
</script>

<FloatingPanel.Root bind:position>
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
          <p>Position: x={position.x}, y={position.y}</p>
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

<script lang="ts">
  import { FloatingPanel, useFloatingPanel } from '@ark-ui/svelte/floating-panel'
  import { Portal } from '@ark-ui/svelte/portal'

  const id = $props.id()
  const floatingPanel = useFloatingPanel({ id })
</script>

<FloatingPanel.RootProvider value={floatingPanel}>
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
</FloatingPanel.RootProvider>

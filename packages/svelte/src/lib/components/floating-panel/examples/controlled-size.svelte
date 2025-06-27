<script lang="ts">
  import { FloatingPanel, type FloatingPanelSizeChangeDetails } from '@ark-ui/svelte/floating-panel'
  import { Portal } from '@ark-ui/svelte/portal'
  import { ArrowDownLeft, Maximize2, Minus, XIcon } from 'lucide-svelte'

  let size = $state({ width: 400, height: 300 })

  function handleSizeChange(e: FloatingPanelSizeChangeDetails) {
    size = e.size
  }
</script>

<FloatingPanel.Root {size} onSizeChange={handleSizeChange}>
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

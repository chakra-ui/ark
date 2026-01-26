<script setup lang="ts">
import { FloatingPanel } from '@ark-ui/vue/floating-panel'
import { ArrowDownLeft, GripVertical, Maximize2, Minus, XIcon } from 'lucide-vue-next'
import styles from 'styles/floating-panel.module.css'
</script>

<template>
  <FloatingPanel.Root>
    <FloatingPanel.Trigger :class="styles.Trigger">Toggle Panel</FloatingPanel.Trigger>
    <Teleport to="body">
      <FloatingPanel.Positioner :class="styles.Positioner">
        <FloatingPanel.Content :class="styles.Content">
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header :class="styles.Header">
              <FloatingPanel.Title :class="styles.Title">
                <GripVertical />
                Floating Panel
              </FloatingPanel.Title>
              <FloatingPanel.Control :class="styles.Control">
                <FloatingPanel.StageTrigger stage="minimized" :class="styles.ControlButton">
                  <Minus />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="maximized" :class="styles.ControlButton">
                  <Maximize2 />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="default" :class="styles.ControlButton">
                  <ArrowDownLeft />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.CloseTrigger :class="styles.ControlButton">
                  <XIcon />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body :class="styles.Body">
            <p>Some content</p>
          </FloatingPanel.Body>

          <FloatingPanel.ResizeTrigger axis="n" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="e" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="w" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="s" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="ne" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="se" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="sw" :class="styles.ResizeTrigger" />
          <FloatingPanel.ResizeTrigger axis="nw" :class="styles.ResizeTrigger" />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </Teleport>
  </FloatingPanel.Root>
</template>

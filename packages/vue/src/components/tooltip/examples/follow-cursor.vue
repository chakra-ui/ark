<script setup lang="ts">
import { Tooltip, useTooltip } from '@ark-ui/vue/tooltip'
import styles from 'styles/tooltip.module.css'

let pointer: { x: number; y: number; element: HTMLElement } | null = null

const tooltip = useTooltip({
  openDelay: 0,
  positioning: {
    placement: 'bottom-start',
    gutter: 12,
    getAnchorElement() {
      const current = pointer
      if (!current) return null
      return {
        contextElement: current.element,
        getBoundingClientRect: () => new DOMRect(current.x, current.y, 0, 0),
      }
    },
  },
})

const handlePointerMove = (event: PointerEvent) => {
  pointer = { x: event.clientX, y: event.clientY, element: event.currentTarget as HTMLElement }
  tooltip.value.reposition()
}
</script>

<template>
  <Tooltip.RootProvider :value="tooltip">
    <Tooltip.Trigger :class="styles.Trigger" @pointermove="handlePointerMove">Hover Me</Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner :class="styles.Positioner">
        <Tooltip.Content :class="styles.Content">I follow your cursor</Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.RootProvider>
</template>

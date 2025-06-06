<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelContextProps
  extends SlotsType<{
    default: UnwrapRef<UseFloatingPanelContext>
  }> {}
</script>

<script setup lang="ts">
import { useFloatingPanelContext } from './use-floating-panel-context'

const floatingPanel = useFloatingPanelContext()

defineSlots<{
  default(floatingPanel: UnwrapRef<UseFloatingPanelContext>): unknown
}>()
</script>

<template>
  <slot v-bind="floatingPanel"></slot>
</template>

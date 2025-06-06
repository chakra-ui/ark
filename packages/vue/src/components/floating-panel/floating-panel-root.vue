<script lang="ts">
import { computed } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './floating-panel.types'
import { FloatingPanelProvider } from './use-floating-panel-context'

export interface FloatingPanelRootBaseProps extends RootProps, RenderStrategyProps {}
export interface FloatingPanelRootEmits extends RootEmits {}
export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {}
</script>

<script setup lang="ts">
import { useForwardExpose, type RenderStrategyProps } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { useFloatingPanel } from './use-floating-panel'

const props = withDefaults(defineProps<FloatingPanelRootProps>(), {
  closeOnEscape: undefined,
  defaultOpen: undefined,
  open: undefined,
  lockAspectRatio: undefined,
  persistRect: undefined,
  resizable: undefined,
  allowOverflow: undefined,
  disabled: undefined,
  draggable: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<FloatingPanelRootEmits>()

const floatingPanel = useFloatingPanel(props, emits)

FloatingPanelProvider(floatingPanel)

const presence = usePresence(
  computed(() => ({
    present: floatingPanel.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>

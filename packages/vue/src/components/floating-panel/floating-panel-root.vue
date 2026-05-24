<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { RootEmits, RootProps } from './floating-panel.types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'

export interface FloatingPanelRootBaseProps extends RootProps, RenderStrategyProps {}
export interface FloatingPanelRootEmits extends RootEmits {}
export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useFloatingPanel } from './use-floating-panel.ts'
import { FloatingPanelProvider } from './use-floating-panel-context.ts'
import { computed } from 'vue'

const props = withDefaults(defineProps<FloatingPanelRootProps>(), {
  closeOnEscape: undefined,
  defaultOpen: undefined,
  open: undefined,
  lockAspectRatio: undefined,
  persistRect: undefined,
  resizable: undefined,
  restoreFocus: undefined,
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
  emits,
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>

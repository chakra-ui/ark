<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits, RootProps } from './drawer.types'

export interface DrawerRootBaseProps extends RootProps, RenderStrategyProps {}
export interface DrawerRootProps extends DrawerRootBaseProps {}
export interface DrawerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { useDrawer } from './use-drawer'
import { DrawerProvider } from './use-drawer-context'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import type { BooleanDefaults } from '../../types'
import { computed } from 'vue'
import { PresenceProvider, usePresence } from '../presence'

const props = withDefaults(defineProps<DrawerRootProps>(), {
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  defaultOpen: undefined,
  modal: undefined,
  open: undefined,
  preventScroll: undefined,
  restoreFocus: undefined,
  snapToSequentialPoints: undefined,
  trapFocus: undefined,
  preventDragOnScroll: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<DrawerRootEmits>()
const drawer = useDrawer(props, emits)

DrawerProvider(drawer)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

const presence = usePresence(
  computed(() => ({
    present: drawer.value.open,
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

<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { RootEmits, RootProps } from './popover.types.ts'

export interface PopoverRootBaseProps extends RootProps, RenderStrategyProps {}
export interface PopoverRootProps extends PopoverRootBaseProps {}
export interface PopoverRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { usePopover } from './use-popover.ts'
import { PopoverProvider } from './use-popover-context.ts'

const props = withDefaults(defineProps<PopoverRootProps>(), {
  autoFocus: undefined,
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  defaultOpen: undefined,
  modal: undefined,
  open: undefined,
  portalled: undefined,
  restoreFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<PopoverRootEmits>()

const popover = usePopover(props, emits)

const presence = usePresence(
  computed(() => ({
    present: popover.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

PopoverProvider(popover)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>

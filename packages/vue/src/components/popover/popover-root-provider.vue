<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { UsePopoverReturn } from './use-popover.ts'
import type { RootEmits as PresenceEmits } from '../presence/presence.types.ts'

interface RootProviderProps {
  value: UnwrapRef<UsePopoverReturn>
}

export interface PopoverRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {}
export interface PopoverRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { PopoverProvider } from './use-popover-context.ts'

const props = defineProps<PopoverRootProviderProps>()
const emits = defineEmits<PopoverRootProviderEmits>()

const popover = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: popover.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
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

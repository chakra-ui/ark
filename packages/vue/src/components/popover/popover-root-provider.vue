<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UsePopoverReturn } from './use-popover'

interface RootProviderProps {
  value: UnwrapRef<UsePopoverReturn>
}

export interface PopoverRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PopoverProvider } from './use-popover-context'

const props = defineProps<PopoverRootProviderProps>()
const popover = computed(() => props.value)

PopoverProvider(popover)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>

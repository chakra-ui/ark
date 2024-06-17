<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { UsePopoverReturn } from './use-popover'

interface RootProviderProps {
  value: UnwrapRef<UsePopoverReturn>
}

export interface PopoverRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { PopoverProvider } from './use-popover-context'

const props = defineProps<PopoverRootProviderProps>()
const popover = computed(() => props.value)

PopoverProvider(popover)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>

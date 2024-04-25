<script lang="ts">
import type { RenderStrategyProps } from '../../utils/render-strategy'
import type { RootEmits, RootProps } from './popover.types'

export interface PopoverRootProps extends RootProps, RenderStrategyProps {}
export interface PopoverRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyProvider } from '../../utils/use-render-strategy'
import { usePopover } from './use-popover'
import { PopoverProvider } from './use-popover-context'

const props = withDefaults(defineProps<PopoverRootProps>(), { open: undefined })
const emits = defineEmits<PopoverRootEmits>()

const popover = usePopover(props, emits)

PopoverProvider(popover)
RenderStrategyProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>

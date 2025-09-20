<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseBottomSheetReturn } from './use-bottom-sheet'

interface RootProviderProps {
  value: UnwrapRef<UseBottomSheetReturn>
}

export interface BottomSheetRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface BottomSheetRootProviderProps extends BottomSheetRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { BottomSheetProvider } from './use-bottom-sheet-context'
import { useForwardExpose } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'

const props = defineProps<BottomSheetRootProviderProps>()
const bottomSheet = computed(() => props.value)

BottomSheetProvider(bottomSheet)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

const presence = usePresence(computed(() => ({ present: bottomSheet.value.open })))
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>

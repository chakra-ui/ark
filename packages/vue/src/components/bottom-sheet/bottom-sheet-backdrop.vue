<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface BottomSheetBackdropBaseProps extends PolymorphicProps {}
export interface BottomSheetBackdropProps
  extends
    BottomSheetBackdropBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { usePresence } from '../presence'
import { ark } from '../factory'
import { useBottomSheetContext } from './use-bottom-sheet-context'

defineProps<BottomSheetBackdropProps>()

const bottomSheet = useBottomSheetContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: bottomSheet.value.open,
  })),
)

const mergedProps = computed(() => mergeProps(bottomSheet.value.getBackdropProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

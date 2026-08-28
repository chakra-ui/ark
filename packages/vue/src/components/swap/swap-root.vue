<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootProps } from './swap.types.ts'

export interface SwapRootBaseProps extends RootProps, PolymorphicProps {}
export interface SwapRootProps
  extends
    SwapRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { mergeProps } from '@zag-js/vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useSwap } from './use-swap.ts'
import { SwapProvider } from './use-swap-context.ts'

const props = withDefaults(defineProps<SwapRootProps>(), {
  swap: undefined,
  lazyMount: undefined,
  unmountOnExit: undefined,
} satisfies BooleanDefaults<RootProps>)

const swap = useSwap(props)
SwapProvider(swap)

const mergedProps = computed(() => mergeProps(swap.getRootProps()))

useForwardExpose()
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.span>
</template>

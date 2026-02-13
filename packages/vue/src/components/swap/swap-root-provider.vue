<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSwapReturn } from './use-swap'

export interface SwapRootProviderBaseProps extends PolymorphicProps {
  value: UseSwapReturn
}
export interface SwapRootProviderProps
  extends
    SwapRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { mergeProps } from '@zag-js/vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { SwapProvider } from './use-swap-context'

const props = defineProps<SwapRootProviderProps>()

SwapProvider(props.value)

const mergedProps = computed(() => mergeProps(props.value.getRootProps()))

useForwardExpose()
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.span>
</template>

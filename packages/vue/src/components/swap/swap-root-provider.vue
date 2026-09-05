<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseSwapReturn } from './use-swap.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { SwapProvider } from './use-swap-context.ts'

const props = defineProps<SwapRootProviderProps>()

SwapProvider(props.value)

const mergedProps = computed(() => mergeProps(props.value.getRootProps()))

useForwardExpose()
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>

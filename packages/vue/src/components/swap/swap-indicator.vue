<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwapIndicatorBaseProps extends PolymorphicProps {
  type: 'on' | 'off'
}
export interface SwapIndicatorProps
  extends
    SwapIndicatorBaseProps,
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
import { useSwapContext } from './use-swap-context'

const props = defineProps<SwapIndicatorProps>()

const swap = useSwapContext()

const presence = computed(() => {
  const p = props.type === 'on' ? swap.onPresence : swap.offPresence
  return p.value
})

const mergedProps = computed(() => mergeProps(swap.getIndicatorProps({ type: props.type })))

useForwardExpose()
</script>

<template>
  <ark.span v-if="!presence.unmounted" v-bind="mergedProps" :ref="presence.presenceProps.ref" :as-child="asChild">
    <slot />
  </ark.span>
</template>

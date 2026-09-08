<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface WindowVirtualizerContentBaseProps extends PolymorphicProps {}
export interface WindowVirtualizerContentProps
  extends
    WindowVirtualizerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

defineProps<WindowVirtualizerContentProps>()
const virtualizer = useWindowVirtualizerContext()

useForwardExpose()

const contentProps = computed(() => ({ style: virtualizer.value.getContentStyle() }))
</script>

<template>
  <ark.div v-bind="contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

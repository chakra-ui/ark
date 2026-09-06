<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface GridVirtualizerContentBaseProps extends PolymorphicProps {}
export interface GridVirtualizerContentProps
  extends
    GridVirtualizerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

defineProps<GridVirtualizerContentProps>()
const virtualizer = useGridVirtualizerContext()

useForwardExpose()

const contentProps = computed(() => ({ style: virtualizer.value.getContentStyle() }))
</script>

<template>
  <ark.div v-bind="contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

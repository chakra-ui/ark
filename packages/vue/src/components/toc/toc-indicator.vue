<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TocIndicatorBaseProps extends PolymorphicProps {}
export interface TocIndicatorProps
  extends
    TocIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useTocContext } from './use-toc-context.ts'

defineProps<TocIndicatorProps>()
const toc = useTocContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toc.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

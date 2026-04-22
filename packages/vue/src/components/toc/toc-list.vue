<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocListBaseProps extends PolymorphicProps {}
export interface TocListProps
  extends
    TocListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'

defineProps<TocListProps>()
const toc = useTocContext()

useForwardExpose()
</script>

<template>
  <ark.ul v-bind="toc.getListProps()" :as-child="asChild">
    <slot />
  </ark.ul>
</template>

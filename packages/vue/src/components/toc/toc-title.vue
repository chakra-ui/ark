<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocTitleBaseProps extends PolymorphicProps {}
export interface TocTitleProps
  extends
    TocTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'

defineProps<TocTitleProps>()
const toc = useTocContext()

useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="toc.getTitleProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.h2>
</template>

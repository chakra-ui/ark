<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps {}
export interface PaginationFirstTriggerProps
  extends
    PaginationFirstTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationFirstTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="pagination.getFirstTriggerProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>

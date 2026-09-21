<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps {}
export interface PaginationPrevTriggerProps
  extends
    PaginationPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationPrevTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.a v-if="pagination.type === 'link'" v-bind="pagination.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </ark.a>
  <ark.button v-else v-bind="pagination.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

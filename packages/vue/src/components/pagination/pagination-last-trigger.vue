<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PaginationAnchorProps } from './use-pagination.ts'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps {}
export interface PaginationLastTriggerProps
  extends
    PaginationLastTriggerBaseProps,
    /**
     * @vue-ignore
     */
    PaginationAnchorProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationLastTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.a v-if="pagination.type === 'link'" v-bind="pagination.getLastTriggerProps()" :as-child="asChild">
    <slot />
  </ark.a>
  <ark.button v-else v-bind="pagination.getLastTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

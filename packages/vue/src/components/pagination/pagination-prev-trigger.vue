<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps {}
export interface PaginationPrevTriggerProps
  extends PaginationPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

defineProps<PaginationPrevTriggerProps>()
const pagination = usePaginationContext()
</script>

<template>
  <ark.button v-bind="pagination.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

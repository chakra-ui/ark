<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<PaginationFirstTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="pagination.getFirstTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

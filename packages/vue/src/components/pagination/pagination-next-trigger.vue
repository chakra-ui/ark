<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PaginationNextTriggerBaseProps extends PolymorphicProps {}
export interface PaginationNextTriggerProps
  extends PaginationNextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'
import { useForwardExpose } from '../../utils'

defineProps<PaginationNextTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="pagination.getNextTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

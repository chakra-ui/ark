<script lang="ts">
import type { ItemProps } from '@zag-js/pagination'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps {}
export interface PaginationItemProps
  extends PaginationItemBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'type' | 'value'> {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

const props = defineProps<PaginationItemProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="pagination.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

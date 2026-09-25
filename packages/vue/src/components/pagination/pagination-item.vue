<script lang="ts">
import type { ItemProps } from '@zag-js/pagination'
import type { ButtonHTMLAttributes } from 'vue'
import type { PaginationAnchorProps } from './use-pagination.ts'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationItemBaseProps extends ItemProps, PolymorphicProps {}
export interface PaginationItemProps
  extends
    PaginationItemBaseProps,
    /**
     * @vue-ignore
     */
    PaginationAnchorProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'type' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PaginationItemProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.a v-if="pagination.type === 'link'" v-bind="pagination.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.a>
  <ark.button v-else v-bind="pagination.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

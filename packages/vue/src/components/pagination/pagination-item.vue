<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/pagination'
import type { ButtonHTMLAttributes } from 'vue'
import type { PaginationAnchorProps } from './use-pagination.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface PaginationItemState extends ItemState {}
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

defineSlots<PolymorphicSlots<PaginationItemState>>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.a
    v-if="pagination.type === 'link'"
    v-bind="pagination.getItemProps(props)"
    :state="pagination.getItemState(props)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.a>
  <ark.button
    v-else
    v-bind="pagination.getItemProps(props)"
    :state="pagination.getItemState(props)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>

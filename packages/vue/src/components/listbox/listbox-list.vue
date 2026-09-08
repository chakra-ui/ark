<script lang="ts">
import type { ListState } from '@zag-js/listbox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ListboxListState extends ListState {}
export interface ListboxListBaseProps extends PolymorphicProps {}
export interface ListboxListProps
  extends
    ListboxListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'

defineProps<ListboxListProps>()

defineSlots<PolymorphicSlots<ListboxListState>>()
const listbox = useListboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getListProps()" :state="listbox.getListState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

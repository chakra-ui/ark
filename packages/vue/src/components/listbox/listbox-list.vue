<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
const listbox = useListboxContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

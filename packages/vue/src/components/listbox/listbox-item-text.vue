<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { useListboxItemPropsContext } from './use-listbox-item-props-context.ts'

export interface ListboxItemTextBaseProps extends PolymorphicProps {}
export interface ListboxItemTextProps
  extends
    ListboxItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'

defineProps<ListboxItemTextProps>()

const listbox = useListboxContext()
const ItemProps = useListboxItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getItemTextProps(ItemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

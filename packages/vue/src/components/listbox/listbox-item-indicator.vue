<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxItemIndicatorBaseProps extends PolymorphicProps {}
export interface ListboxItemIndicatorProps
  extends
    ListboxItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import { useListboxItemPropsContext } from './use-listbox-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ListboxItemIndicatorProps>()

const listbox = useListboxContext()
const itemProps = useListboxItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

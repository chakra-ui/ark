<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useListboxItemPropsContext } from './use-listbox-item-props-context'

export interface ListboxItemTextBaseProps extends PolymorphicProps {}
export interface ListboxItemTextProps
  extends ListboxItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

defineProps<ListboxItemTextProps>()

const listbox = useListboxContext()
const ItemProps = useListboxItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getItemTextProps(ItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>

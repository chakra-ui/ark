<script lang="ts">
import type { ItemGroupProps } from '@zag-js/listbox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ListboxItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface ListboxItemGroupProps
  extends ListboxItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useId } from 'vue'
import { ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { ListboxItemGroupPropsProvider } from './use-listbox-item-group-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<ListboxItemGroupProps>()

const listbox = useListboxContext()

const uid = useId()
const id = props.id ?? uid

ListboxItemGroupPropsProvider({ id })

useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getItemGroupProps({ id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

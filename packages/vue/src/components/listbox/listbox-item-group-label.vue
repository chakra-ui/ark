<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxItemGroupLabelBaseProps extends PolymorphicProps {}
export interface ListboxItemGroupLabelProps
  extends
    ListboxItemGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import { useListboxItemGroupPropsContext } from './use-listbox-item-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ListboxItemGroupLabelProps>()
const listbox = useListboxContext()
const itemGroupProps = useListboxItemGroupPropsContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="listbox.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

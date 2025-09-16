<script lang="ts">
import type { ItemGroupProps } from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface SelectItemGroupProps
  extends SelectItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useId } from 'vue'
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<SelectItemGroupProps>()

const select = useSelectContext()

const uid = useId()
const id = props.id ?? uid

SelectItemGroupPropsProvider({ id })

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getItemGroupProps({ id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

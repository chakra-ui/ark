<script lang="ts">
import type { ItemGroupProps } from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface SelectItemGroupProps
  extends
    SelectItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useId } from 'vue'
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

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

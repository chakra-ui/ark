<script lang="ts">
import type { ItemGroupProps } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface ComboboxItemGroupProps
  extends
    ComboboxItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context.ts'
import { useId } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ComboboxItemGroupProps>()
const combobox = useComboboxContext()

const uid = useId()
const id = props.id ?? uid

ComboboxItemGroupPropsProvider({ id })
useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getItemGroupProps({ id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

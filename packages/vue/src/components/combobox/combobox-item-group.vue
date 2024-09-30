<script lang="ts">
import type { ItemGroupProps } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface ComboboxItemGroupProps
  extends ComboboxItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context'
import { useId } from 'vue'
import { useForwardExpose } from '../../utils'

const props = defineProps<ComboboxItemGroupProps>()
const combobox = useComboboxContext()
const id = props.id ?? useId()

ComboboxItemGroupPropsProvider({ id })
useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getItemGroupProps({ id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

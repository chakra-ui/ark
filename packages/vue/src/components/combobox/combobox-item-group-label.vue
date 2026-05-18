<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps {}
export interface ComboboxItemGroupLabelProps
  extends
    ComboboxItemGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxItemGroupLabelProps>()
const combobox = useComboboxContext()
const itemGroupProps = useComboboxItemGroupPropsContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

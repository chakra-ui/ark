<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps {}
export interface ComboboxItemGroupLabelProps
  extends ComboboxItemGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context'

defineProps<ComboboxItemGroupLabelProps>()
const combobox = useComboboxContext()
const itemGroupProps = useComboboxItemGroupPropsContext()
</script>

<template>
  <ark.div
    v-bind="combobox.getItemGroupLabelProps({ htmlFor: itemGroupProps.id })"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>

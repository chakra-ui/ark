<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemIndicatorBaseProps extends PolymorphicProps {}
export interface ComboboxItemIndicatorProps
  extends ComboboxItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

defineProps<ComboboxItemIndicatorProps>()
const combobox = useComboboxContext()
const itemProps = useComboboxItemPropsContext()
</script>

<template>
  <ark.div v-bind="combobox.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>

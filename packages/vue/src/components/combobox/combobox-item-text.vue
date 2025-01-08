<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxItemTextBaseProps extends PolymorphicProps {}
export interface ComboboxItemTextProps
  extends ComboboxItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

defineProps<ComboboxItemTextProps>()
const combobox = useComboboxContext()
const itemProps = useComboboxItemPropsContext()
useForwardExpose()
</script>

<template>
  <ark.span v-bind="combobox.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>

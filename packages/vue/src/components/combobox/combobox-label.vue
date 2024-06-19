<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxLabelBaseProps extends PolymorphicProps {}
export interface ComboboxLabelProps
  extends ComboboxLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxLabelProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.label v-bind="combobox.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>

<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxLabelBaseProps extends PolymorphicProps {}
export interface ComboboxLabelProps
  extends
    ComboboxLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxLabelProps>()
const combobox = useComboboxContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="combobox.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>

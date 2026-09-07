<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxItemIndicatorBaseProps extends PolymorphicProps {}
export interface ComboboxItemIndicatorProps
  extends
    ComboboxItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxItemIndicatorProps>()
const combobox = useComboboxContext()
const itemProps = useComboboxItemPropsContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

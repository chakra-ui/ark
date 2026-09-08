<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { ItemProps, ItemState } from '@zag-js/radio-group'
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface RadioGroupItemState extends ItemState {}
export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface RadioGroupItemProps
  extends
    RadioGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { computed } from 'vue'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { RadioGroupItemProvider } from './use-radio-group-item-context.ts'
import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  disabled: undefined,
  invalid: undefined,
} satisfies BooleanDefaults<ItemProps>)

defineSlots<PolymorphicSlots<RadioGroupItemState>>()
const radioGroup = useRadioGroupContext()

RadioGroupItemPropsProvider(props)
RadioGroupItemProvider(computed(() => radioGroup.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.label v-bind="radioGroup.getItemProps(props)" :state="radioGroup.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>

<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface RadioGroupItemHiddenInputProps
  extends RadioGroupItemHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

defineProps<RadioGroupItemHiddenInputProps>()

const radioGroup = useRadioGroupContext()
const itemProps = useRadioGroupItemPropsContext()
</script>

<template>
  <ark.input v-bind="radioGroup.getItemHiddenInputProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.input>
</template>

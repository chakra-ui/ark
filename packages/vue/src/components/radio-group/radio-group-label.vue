<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RadioGroupLabelBaseProps extends PolymorphicProps {}
export interface RadioGroupLabelProps
  extends RadioGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

defineProps<RadioGroupLabelProps>()
const radioGroup = useRadioGroupContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="radioGroup.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>

<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DateInputLabelBaseProps extends PolymorphicProps {}
export interface DateInputLabelProps
  extends
    DateInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<DateInputLabelProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="dateInput.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>

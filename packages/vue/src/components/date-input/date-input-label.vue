<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DateInputLabelProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="dateInput.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>

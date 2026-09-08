<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps {}
export interface DatePickerMonthSelectProps
  extends
    DatePickerMonthSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerMonthSelectProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.select v-bind="datePicker.getMonthSelectProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <option v-for="month in datePicker.getMonths()" :key="month.value" :value="month.value">
        {{ month.label }}
      </option>
    </template>
  </ark.select>
</template>

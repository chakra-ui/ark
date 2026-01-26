<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps {}
export interface DatePickerRangeTextProps
  extends
    DatePickerRangeTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { uniq } from '@zag-js/utils'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerRangeTextProps>()
const datePicker = useDatePickerContext()

const visibleRangeText = computed(() => {
  const { start, end } = datePicker.value.visibleRangeText
  return uniq([start, end]).filter(Boolean).join(' - ')
})

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getRangeTextProps()" :as-child="asChild">
    {{ visibleRangeText }}
  </ark.div>
</template>

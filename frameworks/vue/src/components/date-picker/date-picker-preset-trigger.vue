<script lang="ts">
import type { PresetTriggerProps } from '@zag-js/date-picker'
import type { PolymorphicProps } from '../factory'

export interface DatePickerPresetTriggerProps extends PolymorphicProps, PresetTriggerProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

const props = defineProps<DatePickerPresetTriggerProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.button v-bind="datePicker.getPresetTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

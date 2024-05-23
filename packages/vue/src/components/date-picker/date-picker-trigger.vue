<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTriggerProps
  extends PolymorphicProps,
    /* @vue-ignore */ ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerTriggerProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.button v-bind="datePicker.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>

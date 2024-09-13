<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface DatePickerContentBaseProps extends PolymorphicProps {}
export interface DatePickerContentProps
  extends DatePickerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerContentProps>()
const datePicker = useDatePickerContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(datePicker.value.getContentProps(), presence.value.presenceProps),
)
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

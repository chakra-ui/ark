<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface TimePickerContentBaseProps extends PolymorphicProps {}
export interface TimePickerContentProps
  extends TimePickerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'
defineProps<TimePickerContentProps>()

const timePicker = useTimePickerContext()
const presence = usePresenceContext()

const mergedProps = computed(() =>
  mergeProps(timePicker.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

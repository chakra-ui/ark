<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './time-picker.types'

export interface TimePickerRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface TimePickerRootProps
  extends TimePickerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TimePickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { useTimePicker } from './use-time-picker'
import { TimePickerProvider } from './use-time-picker-context'

const props = withDefaults(defineProps<TimePickerRootProps>(), {
  allowSeconds: undefined,
  disabled: undefined,
  disableLayer: undefined,
  open: undefined,
  readOnly: undefined,
  defaultOpen: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TimePickerRootEmits>()

const timePicker = useTimePicker(props, emits)
TimePickerProvider(timePicker)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="timePicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

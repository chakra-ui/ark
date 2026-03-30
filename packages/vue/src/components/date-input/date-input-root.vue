<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './date-input.types'

export interface DateInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface DateInputRootProps
  extends
    DateInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface DateInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useDateInput } from './use-date-input'
import { DateInputProvider } from './use-date-input-context'

const props = withDefaults(defineProps<DateInputRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  shouldForceLeadingZeros: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<DateInputRootEmits>()

const dateInput = useDateInput(props, emits)

DateInputProvider(dateInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="dateInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

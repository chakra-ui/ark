<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './date-input.types.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useDateInput } from './use-date-input.ts'
import { DateInputProvider } from './use-date-input-context.ts'

const props = withDefaults(defineProps<DateInputRootProps>(), {
  disabled: undefined,
  hideTimeZone: undefined,
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

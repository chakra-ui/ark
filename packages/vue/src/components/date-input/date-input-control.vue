<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DateInputControlBaseProps extends PolymorphicProps {}
export interface DateInputControlProps
  extends
    DateInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DateInputControlProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="dateInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

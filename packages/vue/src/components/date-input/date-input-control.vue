<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<DateInputControlProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="dateInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimerSeparatorBaseProps extends PolymorphicProps {}
export interface TimerSeparatorProps
  extends TimerSeparatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimerContext } from './use-timer-context'
import { useForwardExpose } from '../../utils'

defineProps<TimerSeparatorProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getSeparatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

<script lang="ts">
import type { ActionTriggerProps, ActionTriggerState } from '@zag-js/timer'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface TimerActionTriggerState extends ActionTriggerState {}
export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps {}
export interface TimerActionTriggerProps
  extends
    TimerActionTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TimerActionTriggerProps>()

defineSlots<PolymorphicSlots<TimerActionTriggerState>>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.button
    v-bind="timer.getActionTriggerProps(props)"
    :state="timer.getActionTriggerState(props)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>

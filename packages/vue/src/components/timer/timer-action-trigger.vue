<script lang="ts">
import type { ActionTriggerProps } from '@zag-js/timer'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="timer.getActionTriggerProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>

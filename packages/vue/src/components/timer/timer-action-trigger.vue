<script lang="ts">
import type { ActionTriggerProps } from '@zag-js/timer'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps {}
export interface TimerActionTriggerProps
  extends TimerActionTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTimerContext } from './use-timer-context'

const props = defineProps<TimerActionTriggerProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="timer.getActionTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

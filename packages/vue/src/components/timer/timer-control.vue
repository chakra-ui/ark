<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimerControlBaseProps extends PolymorphicProps {}
export interface TimerControlProps
  extends TimerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimerContext } from './use-timer-context'
import { useForwardExpose } from '../../utils'

defineProps<TimerControlProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getControlProps()" :as-child="asChild" />
</template>

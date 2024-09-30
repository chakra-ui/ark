<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimerAreaBaseProps extends PolymorphicProps {}
export interface TimerAreaProps
  extends TimerAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimerContext } from './use-timer-context'
import { useForwardExpose } from '../../utils'

defineProps<TimerAreaProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getAreaProps()" :as-child="asChild" />
</template>

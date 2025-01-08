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
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTimerContext } from './use-timer-context'

defineProps<TimerAreaProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getAreaProps()" :as-child="asChild" />
</template>

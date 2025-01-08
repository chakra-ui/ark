<script lang="ts">
import type { ItemProps } from '@zag-js/timer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimerItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TimerItemProps
  extends TimerItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimerContext } from './use-timer-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TimerItemProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getItemProps(props)" :as-child="asChild">
    {{ timer.formattedTime[props.type] }}
  </ark.div>
</template>

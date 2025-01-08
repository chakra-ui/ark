<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './timer.types'

export interface TimerRootBaseProps extends RootProps, PolymorphicProps {}
export interface TimerRootProps
  extends TimerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TimerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTimer } from './use-timer'
import { TimerProvider } from './use-timer-context'
const props = withDefaults(defineProps<TimerRootProps>(), {
  autoStart: undefined,
  countdown: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TimerRootEmits>()

const timer = useTimer(props, emits)
TimerProvider(timer)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

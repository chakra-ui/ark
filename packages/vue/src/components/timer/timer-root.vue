<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './timer.types.ts'

export interface TimerRootBaseProps extends RootProps, PolymorphicProps {}
export interface TimerRootProps
  extends
    TimerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TimerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTimer } from './use-timer.ts'
import { TimerProvider } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

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

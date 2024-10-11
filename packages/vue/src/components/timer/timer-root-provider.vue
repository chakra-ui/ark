<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseTimerReturn } from './use-timer'

interface RootProviderProps {
  value: UnwrapRef<UseTimerReturn>
}

export interface TimerRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TimerRootProviderProps
  extends TimerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { TimerProvider } from './use-timer-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TimerRootProviderProps>()
const timer = computed(() => props.value)

TimerProvider(timer)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="timer.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

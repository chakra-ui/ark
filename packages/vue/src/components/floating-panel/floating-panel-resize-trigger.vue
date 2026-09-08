<script lang="ts">
import type { ResizeTriggerProps, ResizeTriggerState } from '@zag-js/floating-panel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface FloatingPanelResizeTriggerState extends ResizeTriggerState {}
export interface FloatingPanelResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface FloatingPanelResizeTriggerProps
  extends
    FloatingPanelResizeTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<FloatingPanelResizeTriggerProps>()

defineSlots<PolymorphicSlots<FloatingPanelResizeTriggerState>>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-bind="floatingPanel.getResizeTriggerProps(props)"
    :state="floatingPanel.getResizeTriggerState(props)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

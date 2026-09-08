<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { ResizeTriggerProps, ResizeTriggerState } from '@zag-js/splitter'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface SplitterResizeTriggerState extends ResizeTriggerState {}
export interface SplitterResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface SplitterResizeTriggerProps
  extends
    SplitterResizeTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'id'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { computed } from 'vue'
import { useSplitterContext } from './use-splitter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { SplitterResizeTriggerPropsProvider } from './use-splitter-resize-trigger-props-context.ts'

const props = withDefaults(defineProps<SplitterResizeTriggerProps>(), {
  disabled: undefined,
} satisfies BooleanDefaults<ResizeTriggerProps>)

defineSlots<PolymorphicSlots<SplitterResizeTriggerState>>()
const splitter = useSplitterContext()

SplitterResizeTriggerPropsProvider(computed(() => props))

useForwardExpose()
</script>

<template>
  <ark.button
    v-bind="splitter.getResizeTriggerProps(props)"
    :state="splitter.getResizeTriggerState(props)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>

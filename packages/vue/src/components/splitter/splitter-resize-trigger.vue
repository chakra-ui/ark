<script lang="ts">
import type { ResizeTriggerProps } from '@zag-js/splitter'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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

const props = defineProps<SplitterResizeTriggerProps>()
const splitter = useSplitterContext()

SplitterResizeTriggerPropsProvider(computed(() => props))

useForwardExpose()
</script>

<template>
  <ark.button v-bind="splitter.getResizeTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

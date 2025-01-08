<script lang="ts">
import type { ResizeTriggerProps } from '@zag-js/splitter'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SplitterResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface SplitterResizeTriggerProps
  extends SplitterResizeTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'id'> {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

const props = defineProps<SplitterResizeTriggerProps>()
const splitter = useSplitterContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="splitter.getResizeTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

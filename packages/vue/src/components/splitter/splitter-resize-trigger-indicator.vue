<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SplitterResizeTriggerIndicatorBaseProps extends PolymorphicProps {}
export interface SplitterResizeTriggerIndicatorProps
  extends SplitterResizeTriggerIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useSplitterResizeTriggerPropsContext } from './use-splitter-resize-trigger-props-context'

defineProps<SplitterResizeTriggerIndicatorProps>()
const splitter = useSplitterContext()
const triggerProps = useSplitterResizeTriggerPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="splitter.getResizeTriggerIndicator(triggerProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>

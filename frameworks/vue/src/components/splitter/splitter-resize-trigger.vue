<script lang="ts">
import type { ResizeTriggerProps } from '@zag-js/splitter'
import type { PolimoprhicProps } from '../factory'

export interface SplitterResizeTriggerProps extends PolimoprhicProps, ResizeTriggerProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

const props = defineProps<SplitterResizeTriggerProps>()
const splitter = useSplitterContext()
</script>

<template>
  <ark.button v-bind="splitter.getResizeTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>

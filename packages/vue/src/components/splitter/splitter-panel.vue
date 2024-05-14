<script lang="ts">
import type { PanelProps } from '@zag-js/splitter'
import type { PolymorphicProps } from '../factory'

export interface SplitterPanelProps extends PolymorphicProps, PanelProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

const props = defineProps<SplitterPanelProps>()
const splitter = useSplitterContext()
</script>

<template>
  <ark.div v-bind="splitter.getPanelProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>

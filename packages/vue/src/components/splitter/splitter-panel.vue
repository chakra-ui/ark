<script lang="ts">
import type { PanelProps } from '@zag-js/splitter'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SplitterPanelBaseProps extends PanelProps, PolymorphicProps {}
export interface SplitterPanelProps
  extends SplitterPanelBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'id'> {}
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

<script lang="ts">
import type { PanelProps } from '@zag-js/splitter'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SplitterPanelBaseProps extends PanelProps, PolymorphicProps {}
export interface SplitterPanelProps
  extends
    SplitterPanelBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'id'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSplitterContext } from './use-splitter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SplitterPanelProps>()
const splitter = useSplitterContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="splitter.getPanelProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './progress.types'

export interface ProgressRootBaseProps extends RootProps, PolymorphicProps {}
export interface ProgressRootProps
  extends ProgressRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ProgressRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useProgress } from './use-progress'
import { ProgressProvider } from './use-progress-context'
const props = defineProps<ProgressRootProps>()
const progress = useProgress(props)

ProgressProvider(progress)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="progress.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

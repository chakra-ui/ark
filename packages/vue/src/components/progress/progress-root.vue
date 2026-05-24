<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './progress.types.ts'

export interface ProgressRootBaseProps extends RootProps, PolymorphicProps {}
export interface ProgressRootProps
  extends
    ProgressRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ProgressRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useProgress } from './use-progress.ts'
import { ProgressProvider } from './use-progress-context.ts'

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

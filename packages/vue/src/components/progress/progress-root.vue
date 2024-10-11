<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootProps } from './progress.types'

export interface ProgressRootBaseProps extends RootProps, PolymorphicProps {}
export interface ProgressRootProps
  extends ProgressRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgress } from './use-progress'
import { ProgressProvider } from './use-progress-context'
import { useForwardExpose } from '../../utils'

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

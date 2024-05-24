<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootProps } from './progress.types'

export interface ProgressRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgress } from './use-progress'
import { ProgressProvider } from './use-progress-context'

const props = defineProps<ProgressRootProps>()
const progress = useProgress(props)

ProgressProvider(progress)
</script>

<template>
  <ark.div v-bind="progress.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

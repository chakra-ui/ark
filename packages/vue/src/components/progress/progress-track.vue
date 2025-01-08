<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressTrackBaseProps extends PolymorphicProps {}
export interface ProgressTrackProps
  extends ProgressTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressTrackProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="progress.getTrackProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

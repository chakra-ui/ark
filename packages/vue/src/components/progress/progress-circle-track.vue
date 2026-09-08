<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ProgressCircleTrackBaseProps extends PolymorphicProps {}
export interface ProgressCircleTrackProps
  extends
    ProgressCircleTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ProgressCircleTrackProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.circle v-bind="progress.getCircleTrackProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.circle>
</template>

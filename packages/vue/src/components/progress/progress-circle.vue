<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleBaseProps extends PolymorphicProps {}
export interface ProgressCircleProps
  extends ProgressCircleBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'
import { useForwardExpose } from '../../utils'

defineProps<ProgressCircleProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <ark.svg v-bind="progress.getCircleProps()" :as-child="asChild">
    <slot />
  </ark.svg>
</template>

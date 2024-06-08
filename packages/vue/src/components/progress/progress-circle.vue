<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressCircleProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressCircleProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.svg v-bind="progress.getCircleProps()" :as-child="asChild">
    <slot />
  </ark.svg>
</template>

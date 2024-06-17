<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressLabelBaseProps extends PolymorphicProps {}
export interface ProgressLabelProps
  extends ProgressLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressLabelProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.label v-bind="progress.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>

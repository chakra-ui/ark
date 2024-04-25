<script lang="ts">
import type { ViewProps } from '@zag-js/progress'
import type { PolymorphicProps } from '../factory'

export interface ProgressViewProps extends PolymorphicProps, ViewProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

const props = defineProps<ProgressViewProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.span v-bind="progress.getViewProps(props)" :as-child="asChild">
    <slot />
  </ark.span>
</template>

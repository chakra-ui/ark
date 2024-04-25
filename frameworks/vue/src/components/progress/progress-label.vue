<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ProgressLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressLabelProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.label v-bind="progress.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>

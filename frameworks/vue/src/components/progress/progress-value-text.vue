<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ProgressValueTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'

defineProps<ProgressValueTextProps>()
const progress = useProgressContext()
</script>

<template>
  <ark.span v-bind="progress.valueTextProps" :as-child="asChild">
    {{ progress.valueAsString }}
  </ark.span>
</template>

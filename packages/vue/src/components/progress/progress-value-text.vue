<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ProgressValueTextProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useProgressContext } from './use-progress-context'
import { useSlots } from 'vue'

defineProps<ProgressValueTextProps>()
const progress = useProgressContext()
const slots = useSlots()
</script>

<template>
  <ark.span v-bind="progress.valueTextProps" :as-child="asChild">
    <slot>{{ slots.default?.() || progress.valueAsString }}</slot>
  </ark.span>
</template>

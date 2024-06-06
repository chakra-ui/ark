<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseProgressReturn } from './use-progress'

interface RootProviderProps {
  value: UnwrapRef<UseProgressReturn>
}

export interface ProgressRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { ProgressProvider } from './use-progress-context'

const props = defineProps<ProgressRootProviderProps>()
const progress = computed(() => props.value)

ProgressProvider(progress)
</script>

<template>
  <ark.div v-bind="progress.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

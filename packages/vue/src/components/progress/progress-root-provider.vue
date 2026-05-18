<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseProgressReturn } from './use-progress.ts'

interface RootProviderProps {
  value: UnwrapRef<UseProgressReturn>
}

export interface ProgressRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ProgressRootProviderProps
  extends
    ProgressRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { ProgressProvider } from './use-progress-context.ts'

const props = defineProps<ProgressRootProviderProps>()
const progress = computed(() => props.value)

ProgressProvider(progress)
</script>

<template>
  <ark.div v-bind="progress.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSplitterReturn } from './use-splitter'

interface RootProviderProps {
  value: UnwrapRef<UseSplitterReturn>
}

export interface SplitterRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SplitterRootProviderProps
  extends SplitterRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { SplitterProvider } from './use-splitter-context'

const props = defineProps<SplitterRootProviderProps>()
const splitter = computed(() => props.value)
SplitterProvider(splitter)
</script>

<template>
  <ark.div v-bind="splitter.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

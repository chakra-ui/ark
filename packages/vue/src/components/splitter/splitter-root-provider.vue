<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseSplitterReturn } from './use-splitter.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSplitterReturn>
}

export interface SplitterRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SplitterRootProviderProps
  extends
    SplitterRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { SplitterProvider } from './use-splitter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SplitterRootProviderProps>()

const splitter = computed(() => props.value)
SplitterProvider(splitter)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="splitter.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

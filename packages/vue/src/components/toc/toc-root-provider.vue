<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseTocReturn } from './use-toc'

interface RootProviderProps {
  value: UnwrapRef<UseTocReturn>
}

export interface TocRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TocRootProviderProps
  extends
    TocRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { TocProvider } from './use-toc-context'

const props = defineProps<TocRootProviderProps>()
const toc = computed(() => props.value)

TocProvider(toc)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="toc.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

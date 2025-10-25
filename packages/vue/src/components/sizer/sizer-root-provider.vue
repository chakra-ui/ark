<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSizerReturn } from './use-sizer'

interface RootProviderProps {
  value: UnwrapRef<UseSizerReturn>
}

export interface SizerRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SizerRootProviderProps
  extends SizerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { parts } from './sizer.anatomy'
import { SizerProvider } from './use-sizer-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<SizerRootProviderProps>()
const sizer = computed(() => props.value)

SizerProvider(sizer)

useForwardExpose()
</script>

<template>
  <ark.div :ref="sizer.rootRef" v-bind="parts.root" :as-child="asChild">
    <slot />
  </ark.div>
</template>

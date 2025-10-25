<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SizerContentBaseProps extends PolymorphicProps {}
export interface SizerContentProps
  extends SizerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { parts } from './sizer.anatomy'
import { useSizerContext } from './use-sizer-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<SizerContentProps>()
const sizer = useSizerContext()

useForwardExpose()
</script>

<template>
  <ark.div :ref="sizer.contentRef" v-bind="parts.content" :as-child="asChild">
    <slot />
  </ark.div>
</template>

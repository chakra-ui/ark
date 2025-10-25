<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './sizer.types'

export interface SizerRootBaseProps extends RootProps, PolymorphicProps {}
export interface SizerRootProps
  extends SizerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface SizerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { parts } from './sizer.anatomy'
import { useSizer } from './use-sizer'
import { SizerProvider } from './use-sizer-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<SizerRootProps>()
const emits = defineEmits<SizerRootEmits>()

const sizer = useSizer(props, emits)
SizerProvider(sizer)

useForwardExpose()
</script>

<template>
  <ark.div :ref="sizer.rootRef" v-bind="parts.root" :as-child="asChild">
    <slot />
  </ark.div>
</template>

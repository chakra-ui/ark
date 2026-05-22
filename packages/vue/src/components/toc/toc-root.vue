<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './toc.types'

export interface TocRootBaseProps extends RootProps, PolymorphicProps {}
export interface TocRootProps
  extends
    TocRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TocRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useToc } from './use-toc'
import { TocProvider } from './use-toc-context'

const props = defineProps<TocRootProps>()
const emits = defineEmits<TocRootEmits>()

const toc = useToc(props, emits)
TocProvider(toc)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toc.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

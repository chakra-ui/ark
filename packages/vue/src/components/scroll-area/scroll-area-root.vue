<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootProps } from './scroll-area.types'

export interface ScrollAreaRootBaseProps extends RootProps, PolymorphicProps {}
export interface ScrollAreaRootProps
  extends ScrollAreaRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useScrollArea } from './use-scroll-area'
import { ScrollAreaProvider } from './use-scroll-area-context'

const props = defineProps<ScrollAreaRootBaseProps>()

const scrollArea = useScrollArea(props)
ScrollAreaProvider(scrollArea)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

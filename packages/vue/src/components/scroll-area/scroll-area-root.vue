<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootProps } from './scroll-area.types.ts'

export interface ScrollAreaRootBaseProps extends RootProps, PolymorphicProps {}
export interface ScrollAreaRootProps
  extends
    ScrollAreaRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useScrollArea } from './use-scroll-area.ts'
import { ScrollAreaProvider } from './use-scroll-area-context.ts'

const props = defineProps<ScrollAreaRootBaseProps>()

const scrollArea = useScrollArea(props)
ScrollAreaProvider(scrollArea)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getRootProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

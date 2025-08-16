<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Orientation } from '@zag-js/types'
import type { PolymorphicProps } from '../factory'

interface ThumbProps {
  orientation?: Orientation
}

export interface ScrollAreaThumbBaseProps extends ThumbProps, PolymorphicProps {}
export interface ScrollAreaThumbProps
  extends ScrollAreaThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

const props = defineProps<ScrollAreaThumbBaseProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getThumbProps({ orientation: props.orientation })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

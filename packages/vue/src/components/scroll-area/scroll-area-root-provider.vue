<script lang="ts">
import { computed, type HTMLAttributes, type UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaRootProviderBaseProps extends PolymorphicProps {
  value: UnwrapRef<UseScrollAreaContext>
}
export interface ScrollAreaRootProviderProps
  extends
    ScrollAreaRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { ScrollAreaProvider } from './use-scroll-area-context'

const props = defineProps<ScrollAreaRootProviderBaseProps>()
const scrollArea = computed(() => props.value)

ScrollAreaProvider(scrollArea)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

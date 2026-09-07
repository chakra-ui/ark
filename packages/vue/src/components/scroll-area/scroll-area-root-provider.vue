<script lang="ts">
import { computed, type HTMLAttributes, type UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseScrollAreaContext } from './use-scroll-area-context.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { ScrollAreaProvider } from './use-scroll-area-context.ts'

const props = defineProps<ScrollAreaRootProviderBaseProps>()
const scrollArea = computed(() => props.value)

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

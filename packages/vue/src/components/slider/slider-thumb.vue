<script lang="ts">
import type { ThumbProps } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SliderThumbProps
  extends PolymorphicProps,
    ThumbProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useSliderContext } from './use-slider-context'

const props = defineProps<SliderThumbProps>()
const slider = useSliderContext()
const attrs = useAttrs()

const thumbProps = computed(() => ({
  ...attrs,
  ...slider.value.getThumbProps(props),
}))
</script>

<template>
  <ark.div v-bind="thumbProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="slider.getHiddenInputProps(props)" />
</template>

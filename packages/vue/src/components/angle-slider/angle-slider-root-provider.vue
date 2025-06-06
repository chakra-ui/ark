<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseAngleSliderReturn } from './use-angle-slider'

interface RootProviderProps {
  value: UnwrapRef<UseAngleSliderReturn>
}

export interface AngleSliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AngleSliderRootProviderProps
  extends AngleSliderRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { AngleSliderProvider } from './use-angle-slider-context'

const props = defineProps<AngleSliderRootProviderProps>()
const angleSlider = computed(() => props.value)

AngleSliderProvider(angleSlider)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="angleSlider.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

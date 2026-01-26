<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseImageCropperReturn } from './use-image-cropper'

interface RootProviderProps {
  value: UnwrapRef<UseImageCropperReturn>
}

export interface ImageCropperRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ImageCropperRootProviderProps
  extends
    ImageCropperRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { ImageCropperProvider } from './use-image-cropper-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<ImageCropperRootProviderProps>()
const imageCropper = computed(() => props.value)

ImageCropperProvider(imageCropper)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

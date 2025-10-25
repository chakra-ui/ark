<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ImageCropperViewportBaseProps extends PolymorphicProps {}
export interface ImageCropperViewportProps
  extends ImageCropperViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<ImageCropperViewportProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

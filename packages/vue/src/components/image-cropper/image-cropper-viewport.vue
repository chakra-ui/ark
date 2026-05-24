<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ImageCropperViewportBaseProps extends PolymorphicProps {}
export interface ImageCropperViewportProps
  extends
    ImageCropperViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ImageCropperViewportProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

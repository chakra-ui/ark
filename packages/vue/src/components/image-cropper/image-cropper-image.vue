<script lang="ts">
import type { ImageState } from '@zag-js/image-cropper'
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ImageCropperImageState extends ImageState {}
export interface ImageCropperImageBaseProps extends PolymorphicProps {}
export interface ImageCropperImageProps
  extends
    ImageCropperImageBaseProps,
    /**
     * @vue-ignore
     */
    ImgHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ImageCropperImageProps>()

defineSlots<PolymorphicSlots<ImageCropperImageState>>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.img v-bind="imageCropper.getImageProps()" :state="imageCropper.getImageState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
  </ark.img>
</template>

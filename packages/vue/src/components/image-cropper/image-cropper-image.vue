<script lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<ImageCropperImageProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.img v-bind="imageCropper.getImageProps()" :as-child="asChild" />
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ImageCropperSelectionBaseProps extends PolymorphicProps {}
export interface ImageCropperSelectionProps
  extends
    ImageCropperSelectionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<ImageCropperSelectionProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getSelectionProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

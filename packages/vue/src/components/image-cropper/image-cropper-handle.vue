<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { HandleProps } from './image-cropper.types'

export interface ImageCropperHandleBaseProps extends HandleProps, PolymorphicProps {}
export interface ImageCropperHandleProps
  extends ImageCropperHandleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<ImageCropperHandleProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getHandleProps({ position: props.position })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { HandleProps } from '@zag-js/image-cropper'

export interface ImageCropperHandleBaseProps extends PolymorphicProps, HandleProps {}
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

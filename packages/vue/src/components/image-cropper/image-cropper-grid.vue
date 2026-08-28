<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { GridProps } from '@zag-js/image-cropper'

export interface ImageCropperGridBaseProps extends PolymorphicProps, GridProps {}
export interface ImageCropperGridProps
  extends
    ImageCropperGridBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ImageCropperGridProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getGridProps({ axis: props.axis })" :as-child="asChild">
    <slot />
  </ark.div>
</template>

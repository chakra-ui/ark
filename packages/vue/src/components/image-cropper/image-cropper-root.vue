<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './image-cropper.types.ts'

export interface ImageCropperRootBaseProps extends RootProps, PolymorphicProps {}
export interface ImageCropperRootProps
  extends
    ImageCropperRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ImageCropperRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useImageCropper } from './use-image-cropper.ts'
import { ImageCropperProvider } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<ImageCropperRootProps>(), {
  fixedCropArea: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<ImageCropperRootEmits>()

const imageCropper = useImageCropper(props, emits)
ImageCropperProvider(imageCropper)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

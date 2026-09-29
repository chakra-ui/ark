<script lang="ts">
import type { RootState } from '@zag-js/image-cropper'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './image-cropper.types.ts'

export interface ImageCropperRootState extends RootState {}
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

defineSlots<PolymorphicSlots<ImageCropperRootState>>()

const emits = defineEmits<ImageCropperRootEmits>()

const imageCropper = useImageCropper(props, emits)
ImageCropperProvider(imageCropper)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getRootProps()" :state="imageCropper.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

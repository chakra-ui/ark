<script lang="ts">
import type { SelectionState } from '@zag-js/image-cropper'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ImageCropperSelectionState extends SelectionState {}
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
import { ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ImageCropperSelectionProps>()

defineSlots<PolymorphicSlots<ImageCropperSelectionState>>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="imageCropper.getSelectionProps()" :state="imageCropper.getSelectionState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>

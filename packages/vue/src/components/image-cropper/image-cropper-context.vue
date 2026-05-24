<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseImageCropperContext } from './use-image-cropper-context.ts'

export interface ImageCropperContextProps extends SlotsType<{
  default: UnwrapRef<UseImageCropperContext>
}> {}
</script>

<script setup lang="ts">
import { useImageCropperContext } from './use-image-cropper-context.ts'

const imageCropper = useImageCropperContext()

defineSlots<{
  default(imageCropper: UnwrapRef<UseImageCropperContext>): unknown
}>()
</script>

<template>
  <slot v-bind="imageCropper"></slot>
</template>

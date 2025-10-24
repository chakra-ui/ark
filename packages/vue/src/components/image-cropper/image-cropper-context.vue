<script lang="ts">
import type { UseImageCropperReturn } from './use-image-cropper'

export interface ImageCropperContextProps {
  value: UseImageCropperReturn
}
</script>

<script setup lang="ts">
import { ImageCropperProvider } from './use-image-cropper-context'

const props = defineProps<ImageCropperContextProps>()

ImageCropperProvider(props.value)
</script>

<template>
  <slot />
</template>

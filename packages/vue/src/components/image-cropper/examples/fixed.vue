<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
import { ref } from 'vue'

const imageSrc = ref('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')
</script>

<template>
  <ImageCropper.Root fixedCropArea>
    <ImageCropper.Viewport>
      <ImageCropper.Image :src="imageSrc" alt="Sample image" />
      <ImageCropper.Selection>
        <ImageCropper.Grid axis="horizontal" />
        <ImageCropper.Grid axis="vertical" />
      </ImageCropper.Selection>
    </ImageCropper.Viewport>
  </ImageCropper.Root>
</template>

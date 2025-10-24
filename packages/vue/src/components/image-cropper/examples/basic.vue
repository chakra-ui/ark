<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
import { ref } from 'vue'

const imageSrc = ref('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')
</script>

<template>
  <ImageCropper.Root>
    <ImageCropper.Viewport>
      <ImageCropper.Image :src="imageSrc" alt="Sample image" />
      <ImageCropper.Selection>
        <ImageCropper.Handle position="top-left" />
        <ImageCropper.Handle position="top" />
        <ImageCropper.Handle position="top-right" />
        <ImageCropper.Handle position="right" />
        <ImageCropper.Handle position="bottom-right" />
        <ImageCropper.Handle position="bottom" />
        <ImageCropper.Handle position="bottom-left" />
        <ImageCropper.Handle position="left" />
      </ImageCropper.Selection>
    </ImageCropper.Viewport>
  </ImageCropper.Root>
</template>

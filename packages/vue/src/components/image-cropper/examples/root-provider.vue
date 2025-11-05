<script setup lang="ts">
import { ImageCropper, useImageCropper } from '@ark-ui/vue/image-cropper'

const imageCropper = useImageCropper()
</script>

<template>
  <div>
    <button @click="imageCropper.setZoom(imageCropper.zoom + 0.1)">Zoom In</button>
    <button @click="imageCropper.setZoom(imageCropper.zoom - 0.1)">Zoom Out</button>

    <ImageCropper.RootProvider :value="imageCropper">
      <ImageCropper.Viewport>
        <ImageCropper.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
        <ImageCropper.Selection>
          <ImageCropper.Handle v-for="position in ImageCropper.handles" :key="position" :position="position">
            <div />
          </ImageCropper.Handle>
          <ImageCropper.Grid axis="horizontal" />
          <ImageCropper.Grid axis="vertical" />
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.RootProvider>
  </div>
</template>

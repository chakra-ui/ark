<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
import styles from 'styles/image-cropper.module.css'
</script>

<template>
  <div :class="styles.Layout">
    <p :class="styles.Description">Starts with a pre-defined crop area</p>

    <ImageCropper.Root :class="styles.Root" :initialCrop="{ x: 50, y: 30, width: 200, height: 120 }">
      <ImageCropper.Viewport :class="styles.Viewport">
        <ImageCropper.Image
          :class="styles.Image"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
          alt="Sample"
        />
        <ImageCropper.Selection :class="styles.Selection">
          <ImageCropper.Handle
            v-for="position in ImageCropper.handles"
            :key="position"
            :class="styles.Handle"
            :position="position"
          >
            <div />
          </ImageCropper.Handle>
          <ImageCropper.Grid :class="styles.Grid" axis="horizontal" />
          <ImageCropper.Grid :class="styles.Grid" axis="vertical" />
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper.Root>
  </div>
</template>

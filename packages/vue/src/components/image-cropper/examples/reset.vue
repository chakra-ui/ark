<script setup lang="ts">
import { ImageCropper, useImageCropper } from '@ark-ui/vue/image-cropper'
import { FlipHorizontal, RotateCw, RotateCcw, RefreshCw, ZoomIn, ZoomOut } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const imageCropper = useImageCropper()
</script>

<template>
  <div :class="styles.Layout">
    <div :class="button.Group">
      <button :class="button.Root" @click="imageCropper.zoomBy(-0.1)">
        <ZoomOut />
      </button>
      <button :class="button.Root" @click="imageCropper.zoomBy(0.1)">
        <ZoomIn />
      </button>
      <button :class="button.Root" @click="imageCropper.rotateBy(-90)">
        <RotateCcw />
      </button>
      <button :class="button.Root" @click="imageCropper.rotateBy(90)">
        <RotateCw />
      </button>
      <button :class="button.Root" @click="imageCropper.flipHorizontally()">
        <FlipHorizontal />
      </button>
      <button :class="button.Root" data-variant="surface" @click="imageCropper.reset()">
        <RefreshCw />
        Reset
      </button>
    </div>

    <ImageCropper.RootProvider :class="styles.Root" :value="imageCropper">
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
    </ImageCropper.RootProvider>
  </div>
</template>

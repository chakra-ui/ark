<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
import { ZoomIn, ZoomOut } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'
</script>

<template>
  <div :class="styles.Layout">
    <ImageCropper.Root :class="styles.Root">
      <ImageCropper.Context v-slot="context">
        <div :class="button.Group">
          <button :class="button.Root" @click="context.zoomBy(-0.1)">
            <ZoomOut />
          </button>
          <span :style="{ fontSize: '0.875rem', padding: '0 0.5rem', minWidth: '3rem', textAlign: 'center' }">
            {{ context.zoom.toFixed(1) }}x
          </span>
          <button :class="button.Root" @click="context.zoomBy(0.1)">
            <ZoomIn />
          </button>
        </div>
      </ImageCropper.Context>

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

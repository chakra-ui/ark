<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
import { FlipHorizontal, FlipVertical } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const flip = ref({ horizontal: false, vertical: false })
</script>

<template>
  <div :class="styles.Layout">
    <div :class="button.Group">
      <button
        :class="button.Root"
        :data-variant="flip.horizontal ? 'solid' : undefined"
        @click="flip = { ...flip, horizontal: !flip.horizontal }"
      >
        <FlipHorizontal />
        Horizontal
      </button>
      <button
        :class="button.Root"
        :data-variant="flip.vertical ? 'solid' : undefined"
        @click="flip = { ...flip, vertical: !flip.vertical }"
      >
        <FlipVertical />
        Vertical
      </button>
    </div>

    <ImageCropper.Root :class="styles.Root" :flip="flip" @flip-change="(e) => (flip = e.flip)">
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

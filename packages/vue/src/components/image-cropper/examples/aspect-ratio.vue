<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
import { RectangleHorizontal, Square, RectangleVertical } from 'lucide-vue-next'
import { ref, markRaw } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const aspects = [
  { label: '16:9', value: 16 / 9, icon: markRaw(RectangleHorizontal) },
  { label: '1:1', value: 1, icon: markRaw(Square) },
  { label: '9:16', value: 9 / 16, icon: markRaw(RectangleVertical) },
]

const aspectRatio = ref(16 / 9)
</script>

<template>
  <div :class="styles.Layout">
    <div :class="button.Group">
      <button
        v-for="aspect in aspects"
        :key="aspect.label"
        :class="button.Root"
        :data-variant="aspectRatio === aspect.value ? 'solid' : undefined"
        @click="aspectRatio = aspect.value"
      >
        <component :is="aspect.icon" />
        {{ aspect.label }}
      </button>
    </div>

    <ImageCropper.Root :class="styles.Root" :aspectRatio="aspectRatio">
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

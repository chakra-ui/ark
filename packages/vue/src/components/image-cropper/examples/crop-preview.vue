<script setup lang="ts">
import { ImageCropper, useImageCropper } from '@ark-ui/vue/image-cropper'
import { Crop } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const imageCropper = useImageCropper()
const preview = ref<string | null>(null)

const handleCrop = async () => {
  const result = await imageCropper.value.getCroppedImage({ output: 'dataUrl' })
  if (typeof result === 'string') {
    preview.value = result
  }
}
</script>

<template>
  <div :class="styles.Layout">
    <div :class="button.Group">
      <button :class="button.Root" data-variant="solid" @click="handleCrop">
        <Crop />
        Crop Image
      </button>
    </div>

    <ImageCropper.RootProvider :class="styles.Root" :value="imageCropper">
      <ImageCropper.Viewport :class="styles.Viewport">
        <ImageCropper.Image
          :class="styles.Image"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
          alt="Sample"
          crossorigin="anonymous"
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

    <div :class="styles.Preview">
      <span :class="styles.PreviewLabel">Preview</span>
      <img v-if="preview" :src="preview" alt="Cropped preview" :class="styles.PreviewImage" />
    </div>
  </div>
</template>

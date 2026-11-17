<script setup lang="ts">
import { ImageCropper } from '@ark-ui/vue/image-cropper'
</script>

<template>
  <ImageCropper.Root>
    <ImageCropper.Viewport>
      <ImageCropper.Image as-child>
        <img data-testid="image" src="https://picsum.photos/seed/crop/640/400" alt="Sample" />
      </ImageCropper.Image>
    </ImageCropper.Viewport>
  </ImageCropper.Root>
</template>

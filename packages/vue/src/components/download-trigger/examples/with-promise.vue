<script setup lang="ts">
import { DownloadTrigger } from '@ark-ui/vue/download-trigger'
import { DownloadIcon, ImageIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

const fetchImage = async () => {
  const response = await fetch('https://picsum.photos/200/300')
  return response.blob()
}
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Preview">
      <ImageIcon />
      <span :class="styles.PreviewText">random-image.jpg (fetched on download)</span>
    </div>
    <DownloadTrigger :class="button.Root" :data="fetchImage" fileName="random-image.jpg" mimeType="image/jpeg">
      <DownloadIcon />
      Download Image
    </DownloadTrigger>
  </div>
</template>

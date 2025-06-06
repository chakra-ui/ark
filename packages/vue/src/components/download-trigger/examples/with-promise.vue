<script setup lang="ts">
import { DownloadTrigger } from '@ark-ui/vue/download-trigger'

const fetchImage = async () => {
  const response = await fetch('https://picsum.photos/200/300')
  return response.blob()
}
</script>

<template>
  <DownloadTrigger :data="fetchImage" fileName="random-image.jpg" mimeType="image/jpeg">Download Image</DownloadTrigger>
</template>

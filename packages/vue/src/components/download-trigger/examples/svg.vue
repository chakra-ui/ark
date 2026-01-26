<script setup lang="ts">
import { DownloadTrigger } from '@ark-ui/vue/download-trigger'
import { DownloadIcon, FileIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/download-trigger.module.css'

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
</svg>`
</script>

<template>
  <div :class="styles.Root">
    <div :class="styles.Preview">
      <FileIcon />
      <span :class="styles.PreviewText">circle.svg</span>
    </div>
    <DownloadTrigger :class="button.Root" :data="svgContent" fileName="circle.svg" mimeType="image/svg+xml">
      <DownloadIcon />
      Download SVG
    </DownloadTrigger>
  </div>
</template>

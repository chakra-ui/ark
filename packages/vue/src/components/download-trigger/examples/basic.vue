<script setup lang="ts">
import { DownloadTrigger } from '@ark-ui/vue/download-trigger'
</script>

<template>
  <DownloadTrigger data="Hello world" fileName="hello.txt" mimeType="text/plain">Download txt</DownloadTrigger>
</template>

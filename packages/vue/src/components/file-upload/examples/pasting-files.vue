<script setup lang="ts">
import { FileUpload, useFileUpload } from '@ark-ui/vue/file-upload'

const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' })
</script>

<template>
  <FileUpload.RootProvider :value="fileUpload">
    <FileUpload.Label>File Upload with Paste</FileUpload.Label>
    <textarea
      placeholder="Paste image here..."
      @paste="(e: ClipboardEvent) => fileUpload.setClipboardFiles(e.clipboardData)"
    />
    <FileUpload.ItemGroup>
      <FileUpload.Item v-for="file in fileUpload.acceptedFiles" :file="file" :key="file.name">
        <FileUpload.ItemPreview type="image/*">
          <FileUpload.ItemPreviewImage />
        </FileUpload.ItemPreview>
        <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
      </FileUpload.Item>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.RootProvider>
</template>

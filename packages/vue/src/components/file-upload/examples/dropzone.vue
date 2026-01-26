<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
</script>

<template>
  <FileUpload.Root :maxFiles="5">
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Dropzone>
      <div>Drag and drop files here</div>
      <div>or click to browse</div>
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemPreview type=".*">
            <div>File Icon</div>
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

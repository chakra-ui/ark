<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
</script>

<template>
  <FileUpload.Root :maxFiles="5" accept="image/png,image/jpeg">
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ClearTrigger>Clear Files</FileUpload.ClearTrigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

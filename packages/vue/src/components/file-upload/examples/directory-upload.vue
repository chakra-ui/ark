<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
</script>

<template>
  <FileUpload.Root directory>
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drop your folder here</FileUpload.Dropzone>
    <FileUpload.Trigger>Upload Folder</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemPreview type=".*">
            <div>Generic Icon</div>
          </FileUpload.ItemPreview>
          <FileUpload.ItemName>{{ file.webkitRelativePath ?? file.name }}</FileUpload.ItemName>
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

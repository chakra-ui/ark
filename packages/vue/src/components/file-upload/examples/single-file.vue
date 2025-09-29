<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
import { FileIcon } from 'lucide-vue-next'
</script>

<template>
  <FileUpload.Root :maxFiles="1">
    <FileUpload.Label>Single File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drop a single file here</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file</FileUpload.Trigger>

    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemPreview type=".*">
            <FileIcon />
          </FileUpload.ItemPreview>
          <div>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
          </div>
          <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

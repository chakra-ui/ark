<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
</script>

<template>
  <FileUpload.Root accept="image/png,image/jpeg">
    <FileUpload.Label>File Upload (PNG and JPEG only)</FileUpload.Label>
    <FileUpload.Dropzone>Drop your files here</FileUpload.Dropzone>
    <FileUpload.Trigger>Select Files</FileUpload.Trigger>

    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ rejectedFiles }">
        <FileUpload.Item
          v-for="fileRejection in rejectedFiles"
          :file="fileRejection.file"
          :key="fileRejection.file.name"
        >
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <div>
            <div v-for="error in fileRejection.errors" :key="error" style="color: red">
              {{ error }}
            </div>
          </div>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

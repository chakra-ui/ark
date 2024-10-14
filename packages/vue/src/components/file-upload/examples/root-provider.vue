<script setup lang="ts">
import { FileUpload, useFileUpload } from '@ark-ui/vue/file-upload'

const fileUpload = useFileUpload({ maxFiles: 5 })
</script>

<template>
  <button @click="fileUpload.clearFiles()">Clear</button>

  <FileUpload.RootProvider :value="fileUpload">
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Dropzone>Drop your files here</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemPreview type=".*">
            <div>Generic Icon</div>
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.RootProvider>
</template>

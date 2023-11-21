<script setup lang="ts">
import { FileUpload } from './'
import './file-upload.css'
</script>

<template>
  <Story title="File Upload">
    <Variant title="Basic">
      <FileUpload.Root :maxFiles="5">
        <FileUpload.Dropzone>
          <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
        </FileUpload.Dropzone>
        <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
        <FileUpload.ItemGroup v-slot="files">
          <FileUpload.Item v-for="file in files" :file="file" :key="file">
            <FileUpload.ItemPreview />
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
            <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        </FileUpload.ItemGroup>
      </FileUpload.Root>
    </Variant>
  </Story>
</template>

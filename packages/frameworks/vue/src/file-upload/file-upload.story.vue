<script setup lang="ts">
import { FileUpload } from './'
import './file-upload.css'
</script>

<template>
  <Story title="File Upload">
    <Variant title="Basic">
      <FileUpload.Root #default="api">
        <FileUpload.Dropzone>
          <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
        </FileUpload.Dropzone>
        <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Item v-for="file in api.files" :key="file.name as string" :file="file">
            <FileUpload.ItemPreview />
            <FileUpload.ItemName>{{ file.name }}</FileUpload.ItemName>
            <FileUpload.ItemSizeText>{{ api.getFileSize(file) }}</FileUpload.ItemSizeText>
            <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        </FileUpload.ItemGroup>
      </FileUpload.Root>
    </Variant>
  </Story>
</template>

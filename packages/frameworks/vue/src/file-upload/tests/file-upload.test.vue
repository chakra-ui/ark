<script setup lang="ts">
import { ref } from 'vue'
import { FileUpload } from '../'

const testProps = ref<string[]>([])
</script>

<template>
  <FileUpload.Root #default="api" v-model="testProps">
    <FileUpload.Dropzone>
      <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
    </FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Item v-for="file in api.files" :key="file.name as string" :file="file">
        <FileUpload.ItemPreviewImage />
        <FileUpload.ItemName>{{ file.name }}</FileUpload.ItemName>
        <FileUpload.ItemSizeText>{{ api.getFileSize(file) }}</FileUpload.ItemSizeText>
        <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
      </FileUpload.Item>
    </FileUpload.ItemGroup>
  </FileUpload.Root>
</template>

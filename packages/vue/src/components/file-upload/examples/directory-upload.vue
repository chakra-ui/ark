<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
</script>

<template>
  <FileUpload.Root directory>
    <FileUpload.Trigger>Upload Folder</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemName>{{ file.webkitRelativePath ?? file.name }}</FileUpload.ItemName>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

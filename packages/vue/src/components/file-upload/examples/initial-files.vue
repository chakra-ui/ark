<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'

const defaultAcceptedFiles = [new File(['Welcome to Ark UI Vue'], 'README.md', { type: 'text/plain' })]
</script>

<template>
  <FileUpload.Root :default-accepted-files="defaultAcceptedFiles">
    <FileUpload.Label>File Upload</FileUpload.Label>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <div>📄</div>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

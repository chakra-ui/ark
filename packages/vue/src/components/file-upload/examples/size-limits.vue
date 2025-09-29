<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
import { FileIcon } from 'lucide-vue-next'
</script>

<template>
  <FileUpload.Root :maxFileSize="1024 * 1024" :minFileSize="1024">
    <FileUpload.Label>File Upload (1KB - 1MB)</FileUpload.Label>
    <FileUpload.Dropzone>Drop files here (1KB - 1MB)</FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>

    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemPreview type=".*">
            <FileIcon />
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>X</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <!-- Show rejected files -->
    <FileUpload.Context v-slot="{ rejectedFiles }">
      <div v-if="rejectedFiles.length > 0" style="color: red; margin-top: 1rem">
        <h4>Rejected Files:</h4>
        <p v-for="rejectedFile in rejectedFiles" :key="rejectedFile.file.name">
          {{ rejectedFile.file.name }} ({{ rejectedFile.file.size }} bytes) - {{ rejectedFile.errors.join(', ') }}
        </p>
      </div>
    </FileUpload.Context>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

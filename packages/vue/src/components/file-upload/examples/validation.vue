<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
import { FileIcon } from 'lucide-vue-next'
</script>

<template>
  <FileUpload.Root
    :validate="
      (file) => {
        if (file.name.length > 20) return ['FILE_NAME_TOO_LONG']
        return null
      }
    "
  >
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
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

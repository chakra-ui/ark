<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'

const props = defineProps<{ file: File }>()
const file = props.file
</script>

<template>
  <FileUpload.Root :default-accepted-files="[file]">
    <FileUpload.Dropzone>Drop</FileUpload.Dropzone>
    <FileUpload.ItemGroup>
      <FileUpload.Item :file="props.file">
        <FileUpload.ItemPreviewImage alt="preview" />
      </FileUpload.Item>
    </FileUpload.ItemGroup>
  </FileUpload.Root>
</template>

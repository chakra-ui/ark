<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import { FileUpload } from '@ark-ui/vue'
</script>

<template>
  <FileUpload.Root :max-files="2" @file-reject="(fileRejection) => console.log(fileRejection)">
    <FileUpload.Dropzone>Drag and drop your images here</FileUpload.Dropzone>

    <!-- Accepted Files -->
    <FileUpload.ItemGroup type="accepted">
      <h3>Accepted Files</h3>
      <FileUpload.Context #default="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :key="file.name" :file="file">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemName />
          <FileUpload.ItemDeleteTrigger>
            <XIcon />
          </FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <!-- Rejected Files -->
    <FileUpload.ItemGroup type="rejected">
      <h3>Rejected Files</h3>
      <FileUpload.Context #default="{ rejectedFiles }">
        <FileUpload.Item v-for="{ file, errors } in rejectedFiles" :key="file.name" :file="file">
          <FileUpload.ItemName />
          {{ errors.join(', ') }}
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>
            <XIcon />
          </FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

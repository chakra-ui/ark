<script setup lang="ts">
import { ref } from 'vue'
import { FileUpload, type FileUploadRootEmits, type FileUploadRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const testProps = ref<string[]>([])

const props = defineProps<FileUploadRootProps>()
const emits = defineEmits<FileUploadRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <FileUpload.Root v-model="testProps" v-bind="localProps">
    <FileUpload.Dropzone>
      <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
    </FileUpload.Dropzone>
    <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
    <FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
    <FileUpload.ItemGroup>
      <FileUpload.Context v-slot="api">
        <FileUpload.Item v-for="file in api.acceptedFiles" :key="file.name as string" :file="file">
          <FileUpload.ItemPreviewImage />
          <FileUpload.ItemName>{{ file.name }}</FileUpload.ItemName>
          <FileUpload.ItemSizeText>{{ api.getFileSize(file) }}</FileUpload.ItemSizeText>
          <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

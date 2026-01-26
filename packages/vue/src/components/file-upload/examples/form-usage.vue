<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
import { useForm, useField } from 'vee-validate'
import { FileIcon, PaperclipIcon, XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/file-upload.module.css'

const { handleSubmit } = useForm<{ files: File[] }>()

const { setValue } = useField<File[]>('files')

const onSubmit = handleSubmit((values) => {
  window.alert(JSON.stringify({ files: values.files?.map((f) => f.name) }))
})
</script>

<template>
  <form class="stack" @submit="onSubmit">
    <FileUpload.Root :maxFiles="5" name="files" :class="styles.Root" @file-change="(e) => setValue(e.acceptedFiles)">
      <FileUpload.Label :class="styles.Label">File Upload</FileUpload.Label>
      <FileUpload.Trigger :class="styles.Trigger">
        <PaperclipIcon />
        Choose file(s)
      </FileUpload.Trigger>
      <FileUpload.ItemGroup :class="styles.ItemGroup">
        <FileUpload.Context v-slot="{ acceptedFiles }">
          <FileUpload.Item v-for="file in acceptedFiles" :key="file.name" :file="file" :class="styles.Item">
            <FileUpload.ItemPreview type="image/*" :class="styles.ItemPreview">
              <FileUpload.ItemPreviewImage :class="styles.ItemPreviewImage" />
            </FileUpload.ItemPreview>
            <FileUpload.ItemPreview type=".*" :class="styles.ItemPreview">
              <FileIcon />
            </FileUpload.ItemPreview>
            <FileUpload.ItemName :class="styles.ItemName" />
            <FileUpload.ItemSizeText :class="styles.ItemSizeText" />
            <FileUpload.ItemDeleteTrigger :class="styles.ItemDeleteTrigger">
              <XIcon />
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
    <button :class="button.Root" data-variant="solid" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface FileUploadDropzoneProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadDropzoneProps>()

const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.div v-bind="fileUpload.dropzoneProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

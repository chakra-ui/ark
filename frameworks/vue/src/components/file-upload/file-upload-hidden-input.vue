<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface FileUploadHiddenInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadHiddenInputProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.input v-bind="fileUpload.hiddenInputProps" :as-child="asChild" />
</template>

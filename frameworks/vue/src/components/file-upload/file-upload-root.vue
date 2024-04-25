<script lang="ts">
import type { RootEmits, RootProps } from './file-upload.types'

export interface FileUploadRootProps extends RootProps, PolimoprhicProps {}
export interface FileUploadRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useFileUpload } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

const props = defineProps<FileUploadRootProps>()
const emits = defineEmits<FileUploadRootEmits>()

const fileUpload = useFileUpload(props, emits)
FileUploadProvider(fileUpload)
</script>

<template>
  <ark.div v-bind="fileUpload.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

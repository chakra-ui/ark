<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface FileUploadDropzoneProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadDropzoneProps>()
const attrs = useAttrs()
const fileUpload = useFileUploadContext()
const dropzoneProps = computed(() => ({
  ...attrs,
  ...fileUpload.value.dropzoneProps,
}))
</script>

<template>
  <ark.div v-bind="dropzoneProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="fileUpload.hiddenInputProps" />
</template>

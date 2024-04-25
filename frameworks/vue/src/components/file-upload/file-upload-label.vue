<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface FileUploadLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadLabelProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.label v-bind="fileUpload.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>

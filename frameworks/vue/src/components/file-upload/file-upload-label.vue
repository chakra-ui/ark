<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface FileUploadLabelProps extends PolymorphicProps {}
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

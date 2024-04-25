<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface FileUploadItemGroupProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadItemGroupProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.ul v-bind="fileUpload.itemGroupProps" :as-child="asChild">
    <slot />
  </ark.ul>
</template>

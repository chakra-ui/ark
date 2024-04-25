<script lang="ts">
import type { PolymorphicProps } from '../factory'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemSizeTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadItemSizeTextProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemSizeTextProps(itemProps)" :as-child="asChild">
    <!-- TODO -->
    <!-- {slots.default?.() || api.value.getFileSize(itemProps.file)} -->
    <slot />
  </ark.div>
</template>

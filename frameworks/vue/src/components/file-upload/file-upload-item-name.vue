<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface FileUploadItemNameProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

defineProps<FileUploadItemNameProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemNameProps(itemProps)" :as-child="asChild">
    <!-- TODO -->
    <!-- {slots.default?.() || itemProps.file.name} -->
    <slot />
  </ark.div>
</template>

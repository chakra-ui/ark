<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemPreviewImageProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

defineProps<FileUploadItemPreviewImageProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
const url = ref<string>('')

computed(() => fileUpload.value.createFileUrl(itemProps.file, (src) => (url.value = src)))
</script>

<template>
  <ark.img v-bind="fileUpload.getItemPreviewImageProps({ ...itemProps, url })" />
</template>

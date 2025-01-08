<script lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps {}
export interface FileUploadItemPreviewImageProps
  extends FileUploadItemPreviewImageBaseProps,
    /**
     * @vue-ignore
     */
    ImgHTMLAttributes {}
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

defineProps<FileUploadItemPreviewImageProps>()

const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()

const url = ref<string>('')

watchEffect((onCleanup) => {
  const cleanup = fileUpload.value.createFileUrl(itemProps.file, (src) => (url.value = src))
  onCleanup(cleanup)
})

useForwardExpose()
</script>

<template>
  <ark.img v-bind="fileUpload.getItemPreviewImageProps({ ...itemProps, url })" />
</template>

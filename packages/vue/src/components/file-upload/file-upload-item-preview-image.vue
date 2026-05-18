<script lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps {}
export interface FileUploadItemPreviewImageProps
  extends
    FileUploadItemPreviewImageBaseProps,
    /**
     * @vue-ignore
     */
    ImgHTMLAttributes {}
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadItemPreviewImageProps>()

const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()

const url = ref<string>('')

watchEffect((onCleanup) => {
  const cleanup = fileUpload.value.createFileUrl(itemProps.value.file, (src) => (url.value = src))
  onCleanup(cleanup)
})

useForwardExpose()
</script>

<template>
  <ark.img v-if="url" v-bind="fileUpload.getItemPreviewImageProps({ ...itemProps, url })" />
</template>

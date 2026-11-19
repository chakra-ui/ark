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
import { ref, watch } from 'vue'
import { ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadItemPreviewImageProps>()

const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()

const url = ref<string>('')

watch(
  () => itemProps.value.file,
  (file, _, onCleanup) => {
    const cleanup = fileUpload.value.createFileUrl(file, (src) => (url.value = src))
    onCleanup(cleanup)
  },
  { immediate: true },
)

useForwardExpose()
</script>

<template>
  <ark.img v-if="url" v-bind="fileUpload.getItemPreviewImageProps({ ...itemProps, url })" />
</template>

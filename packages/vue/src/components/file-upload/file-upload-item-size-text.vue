<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemSizeTextBaseProps extends PolymorphicProps {}
export interface FileUploadItemSizeTextProps
  extends FileUploadItemSizeTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

defineProps<FileUploadItemSizeTextProps>()

const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getItemSizeTextProps(itemProps)" :as-child="asChild">
    <slot>
      {{ slots.default?.() || fileUpload.getFileSize(itemProps.file) }}
    </slot>
  </ark.div>
</template>

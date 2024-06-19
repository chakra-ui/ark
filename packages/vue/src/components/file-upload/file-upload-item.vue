<script lang="ts">
import type { ItemProps } from '@zag-js/file-upload'
import type { LiHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

export interface FileUploadItemBaseProps extends ItemProps, PolymorphicProps {}
export interface FileUploadItemProps
  extends FileUploadItemBaseProps,
    /**
     * @vue-ignore
     */
    LiHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

const props = defineProps<FileUploadItemProps>()
const fileUpload = useFileUploadContext()
FileUploadItemPropsProvider(props)
</script>

<template>
  <ark.li v-bind="fileUpload.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.li>
</template>

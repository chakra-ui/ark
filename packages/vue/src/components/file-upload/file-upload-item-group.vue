<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadItemGroupBaseProps extends PolymorphicProps {}
export interface FileUploadItemGroupProps
  extends FileUploadItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadItemGroupProps>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.ul v-bind="fileUpload.getItemGroupProps()" :as-child="asChild">
    <slot />
  </ark.ul>
</template>

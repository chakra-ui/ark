<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadDropzoneBaseProps extends PolymorphicProps {}
export interface FileUploadDropzoneProps
  extends FileUploadDropzoneBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useForwardExpose } from '../../utils'

defineProps<FileUploadDropzoneProps>()

const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="fileUpload.getDropzoneProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

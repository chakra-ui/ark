<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadDropzoneProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadDropzoneProps>()

const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.div v-bind="fileUpload.getDropzoneProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>

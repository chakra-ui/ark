<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadClearTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadClearTriggerProps
  extends FileUploadClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadClearTriggerProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.button v-bind="fileUpload.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

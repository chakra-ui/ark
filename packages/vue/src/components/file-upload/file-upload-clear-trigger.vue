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
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadClearTriggerProps>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="fileUpload.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>

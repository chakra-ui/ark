<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FileUploadTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadTriggerProps
  extends FileUploadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadTriggerProps>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="fileUpload.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
